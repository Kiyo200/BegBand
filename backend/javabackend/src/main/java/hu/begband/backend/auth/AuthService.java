package hu.begband.backend.auth;

import hu.begband.backend.auth.AuthDtos.LoginRequest;
import hu.begband.backend.auth.AuthDtos.RegisterRequest;
import hu.begband.backend.auth.AuthDtos.UserResponse;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Locale;

@Service
public class AuthService {

    private static final int DEFAULT_ROLE_ID = 1;

    private final UserRepository users;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UserRepository users, PasswordEncoder passwordEncoder) {
        this.users = users;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public UserResponse register(RegisterRequest request) {
        String username = request.username().trim();
        String email = request.email().trim().toLowerCase(Locale.ROOT);

        if (users.existsByUsername(username)) {
            throw new AuthException(HttpStatus.CONFLICT, "Ez a felhasználónév már foglalt.");
        }
        if (users.existsByEmail(email)) {
            throw new AuthException(HttpStatus.CONFLICT, "Ezzel az e-mail címmel már regisztráltak.");
        }

        String hash = passwordEncoder.encode(request.password());
        try {
            User saved = users.saveAndFlush(new User(username, email, hash, DEFAULT_ROLE_ID));
            return UserResponse.from(saved);
        } catch (DataIntegrityViolationException e) {
            throw new AuthException(HttpStatus.CONFLICT, "Ez a felhasználónév vagy e-mail cím már foglalt.");
        }
    }

    @Transactional(readOnly = true)
    public UserResponse login(LoginRequest request) {
        String identifier = request.identifier().trim();

        User user = (identifier.contains("@")
                ? users.findByEmail(identifier.toLowerCase(Locale.ROOT))
                : users.findByUsername(identifier))
                .orElseThrow(() -> new AuthException(HttpStatus.UNAUTHORIZED, "Hibás felhasználónév vagy jelszó."));

        if (!passwordEncoder.matches(request.password(), user.getPasswordHash())) {
            throw new AuthException(HttpStatus.UNAUTHORIZED, "Hibás felhasználónév vagy jelszó.");
        }
        if (!"active".equals(user.getStatus())) {
            throw new AuthException(HttpStatus.FORBIDDEN, "Ez a fiók le van tiltva vagy törölve lett.");
        }
        return UserResponse.from(user);
    }
}
