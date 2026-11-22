using System;
using System.Collections.Generic;
using System.Text;

namespace asztaliAlkalmazas
{
    public class User
    {
        public int Id { get; private set; }
        public string Username { get; private set; }
        public string Email { get; private set; }

        public User(int id, string username, string email)
        {
            Id = id;
            Username = username;
            Email = email;

        }
    }
}
