package hu.begband.backend.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public final class AuthDtos {

    private AuthDtos() {
    }

    public record RegisterRequest(
            @NotBlank(message = "Adj meg egy felhasználónevet.")
            @Size(min = 3, max = 50, message = "A felhasználónév 3–50 karakter legyen.")
            @Pattern(regexp = "^[\\p{L}0-9._-]+$", message = "Csak betű, szám, pont, kötőjel és aláhúzás lehet benne.")
            String username,

            @NotBlank(message = "Add meg az e-mail címed.")
            @Email(message = "Ez nem érvényes e-mail cím.")
            @Size(max = 255)
            String email,

            @NotBlank(message = "Add meg a jelszót.")
            @Size(min = 8, max = 72, message = "A jelszó 8–72 karakter legyen.")
            String password
    ) {
    }

    public record LoginRequest(
            @NotBlank(message = "Add meg a felhasználóneved vagy az e-mail címed.")
            String identifier,

            @NotBlank(message = "Add meg a jelszavad.")
            String password
    ) {
    }

    public record UserResponse(Integer id, String username, String email) {
        static UserResponse from(User user) {
            return new UserResponse(user.getId(), user.getUsername(), user.getEmail());
        }
    }

    public record ErrorResponse(String message) {
    }
}
