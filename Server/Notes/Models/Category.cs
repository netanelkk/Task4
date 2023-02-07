using Notes.Models.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Notes.Models
{
    public class Category
    {
        private int id;
        private string name;
        private int numOfNotes;

        public Category(int id, string name, int numOfNotes)
        {
            this.id = id;
            this.name = name;
            this.numOfNotes = numOfNotes;
        }

        public static List<Category> GetAll()
        {
            DataServices ds = new DataServices();
            return ds.GetCategories();
        }

        public static bool AddCategory(string name)
        {
            DataServices ds = new DataServices();
            return ds.AddCategory(name);
        }

        public int Id { get => id; set => id = value; }
        public string Name { get => name; set => name = value; }
        public int NumOfNotes { get => numOfNotes; set => numOfNotes = value; }
    }
}