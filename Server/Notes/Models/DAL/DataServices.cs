using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Configuration;

namespace Notes.Models.DAL
{
    public class DataServices
    {
        // Delete note
        public bool DeleteNote(int noteId)
        {
            SqlConnection con = null;
            try
            {
                con = Connect();

                SqlCommand command = new SqlCommand();

                command.Parameters.AddWithValue("noteId", noteId);

                command.CommandText = "spDeleteNote";
                command.Connection = con;
                command.CommandType = CommandType.StoredProcedure;
                command.CommandTimeout = 10; // in seconds

                command.ExecuteNonQuery();
                con.Close();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
            finally
            {
                if (con != null)
                {
                    con.Close();
                }
            }
        }

        // Update note
        public bool UpdateNote(string content, int noteId, string picturePath)
        {
            SqlConnection con = null;
            try
            {
                con = Connect();

                SqlCommand command = new SqlCommand();

                command.Parameters.AddWithValue("content", content);
                command.Parameters.AddWithValue("noteId", noteId);
                command.Parameters.AddWithValue("picturePath", picturePath);

                command.CommandText = "spUpdateNote";
                command.Connection = con;
                command.CommandType = CommandType.StoredProcedure;
                command.CommandTimeout = 10; // in seconds

                command.ExecuteNonQuery();
                con.Close();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
            finally
            {
                if (con != null)
                {
                    con.Close();
                }
            }
        }

        // Get note by id
        public Note GetNote(int noteId)
        {
            SqlConnection con = null;
            try
            {
                con = Connect();

                SqlCommand command = new SqlCommand();

                command.Parameters.AddWithValue("noteId", noteId);

                command.CommandText = "spGetNote";
                command.Connection = con;
                command.CommandType = CommandType.StoredProcedure;
                command.CommandTimeout = 10; // in seconds

                Note note = null;
                using (SqlDataReader dr = command.ExecuteReader(CommandBehavior.Default))
                {
                    while (dr.Read())
                    {
                        note = new Note(int.Parse(dr["id"].ToString()),
                                                    dr["content"].ToString(),
                                                    dr["createdDate"].ToString(),
                                                    dr["picturePath"].ToString(),
                                                    int.Parse(dr["categoryId"].ToString()));
                    }
                }
                con.Close();
                return note;
            }
            catch (Exception)
            {
                return null;
            }
            finally
            {
                if (con != null)
                {
                    con.Close();
                }
            }
        }

        // Add new note
        public bool AddNote(string content, int categoryId, string picturePath)
        {
            SqlConnection con = null;
            try
            {
                con = Connect();

                SqlCommand command = new SqlCommand();

                command.Parameters.AddWithValue("content", content);
                command.Parameters.AddWithValue("categoryId", categoryId);
                command.Parameters.AddWithValue("picturePath", picturePath);

                command.CommandText = "spInsertNote";
                command.Connection = con;
                command.CommandType = CommandType.StoredProcedure;
                command.CommandTimeout = 10; // in seconds

                command.ExecuteNonQuery();
                con.Close();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
            finally
            {
                if (con != null)
                {
                    con.Close();
                }
            }
        }

        // Get all notes
        public List<Note> GetNotes(int categoryId)
        {
            SqlConnection con = null;
            try
            {
                con = Connect();

                SqlCommand command = new SqlCommand();

                command.Parameters.AddWithValue("categoryId", categoryId);

                command.CommandText = "spGetNotes";
                command.Connection = con;
                command.CommandType = CommandType.StoredProcedure;
                command.CommandTimeout = 10; // in seconds

                List<Note> notes = new List<Note>();
                using (SqlDataReader dr = command.ExecuteReader(CommandBehavior.Default))
                {
                    while (dr.Read())
                    {
                        notes.Add(new Note(int.Parse(dr["id"].ToString()),
                                                    dr["content"].ToString(),
                                                    dr["createdDate"].ToString(),
                                                    dr["picturePath"].ToString(),
                                                    int.Parse(dr["categoryId"].ToString())));
                    }
                }
                con.Close();
                return notes;
            }
            catch (Exception)
            {
                return null;
            }
            finally
            {
                if (con != null)
                {
                    con.Close();
                }
            }
        }

        // Add new category
        public bool AddCategory(string name)
        {
            SqlConnection con = null;
            try
            {
                con = Connect();

                SqlCommand command = new SqlCommand();

                command.Parameters.AddWithValue("name", name);

                command.CommandText = "spInsertCategory";
                command.Connection = con;
                command.CommandType = CommandType.StoredProcedure;
                command.CommandTimeout = 10; // in seconds

                command.ExecuteNonQuery();
                con.Close();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
            finally
            {
                if (con != null)
                {
                    con.Close();
                }
            }
        }


        // Get all categories
        public List<Category> GetCategories()
        {
            SqlConnection con = null;
            try
            {
                con = Connect();

                SqlCommand command = new SqlCommand();

                command.CommandText = "spGetCategories";
                command.Connection = con;
                command.CommandType = CommandType.StoredProcedure;
                command.CommandTimeout = 10; // in seconds

                List<Category> categories = new List<Category>();
                using (SqlDataReader dr = command.ExecuteReader(CommandBehavior.Default))
                {
                    while (dr.Read())
                    {
                        categories.Add(new Category(int.Parse(dr["id"].ToString()),
                                                    dr["name"].ToString(),
                                                    int.Parse(dr["numOfNotes"].ToString())));
                    }
                }
                con.Close();
                return categories;
            }
            catch (Exception)
            {
                return null;
            }
            finally
            {
                if (con != null)
                {
                    con.Close();
                }
            }
        }

        private SqlConnection Connect()
        {


            // read the connection string from the web.config file
            string connectionString = WebConfigurationManager.ConnectionStrings["DBConnectionString"].ConnectionString;

            // create the connection to the db
            SqlConnection con = new SqlConnection(connectionString);

            // open the database connection
            con.Open();

            return con;

        }
    }
}