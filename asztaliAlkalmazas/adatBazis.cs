using Npgsql;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;
using System.Windows;

namespace asztaliAlkalmazas
{
    public class adatBazis
    {
        private static readonly string connectionString =
            "Host=localhost;" +
            "Port=5433;" +
            "Database=postgres;" +
            "Username=postgres;" +
            "Password=ef4ccd8991d0944cd795a34748b40fce;" +
            "SSL Mode=Disable";

        public static NpgsqlConnection GetConnection()
        {
            var connection = new NpgsqlConnection(connectionString);
            connection.Open();
            return connection;
        }

        public static List<User> LoadUsers()
        {
            List<User> lista = new List<User>();

            NpgsqlConnection connection = GetConnection();
            NpgsqlCommand command = new NpgsqlCommand("SELECT id, username, email FROM \"Users\"", connection);
            NpgsqlDataReader reader = command.ExecuteReader();

            while (reader.Read())
            {
                int id = reader.GetInt32("id");
                string username = reader.GetString("username");
                string email = reader.GetString("email");

                lista.Add(new User(id, username, email));
            }

            connection.Close();
            return lista;
        }

    }
}
