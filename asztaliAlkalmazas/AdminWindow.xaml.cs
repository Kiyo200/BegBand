using System;
using System.Collections.Generic;
using System.Text;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Shapes;

namespace asztaliAlkalmazas
{
    /// <summary>
    /// Interaction logic for AdminWindow.xaml
    /// </summary>
    public partial class AdminWindow : Window
    {
        public AdminWindow()
        {
            InitializeComponent();
            loadData();
            
        }
        private void loadData()
        {
            try
            {  
                dgFelhasznalok.ItemsSource = adatBazis.LoadUsers();

            }
            catch (Exception ex)
            {
                MessageBox.Show("Hiba az adatok beröltésekor:" + ex.Message);
            }
        }

        private void logout_Click(object sender, RoutedEventArgs e)
        {
            MainWindow login = new MainWindow();
            login.Show();
            this.Close();
        }
    }
}
