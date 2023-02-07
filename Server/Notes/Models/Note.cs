using Notes.Models.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Notes.Models
{
    public class Note
    {
        private int id;
        private string content;
        private string createdDate;
        private string picturePath;
        private int categoryId;

        public Note(int id, string content, string createdDate, string picturePath, int categoryId)
        {
            this.id = id;
            this.content = content;
            this.createdDate = createdDate;
            this.picturePath = picturePath;
            this.categoryId = categoryId;
        }

        public static List<Note> GetAll(int categoryId)
        {
            DataServices ds = new DataServices();
            return ds.GetNotes(categoryId);
        }

        public static bool AddNote(string content, int categoryId, string picturePath)
        {
            DataServices ds = new DataServices();
            return ds.AddNote(content, categoryId, picturePath);
        }

        public static Note GetNote(int noteId)
        {
            DataServices ds = new DataServices();
            return ds.GetNote(noteId);
        }

        public static bool UpdateNote(string content, int noteId, string picturePath)
        {
            DataServices ds = new DataServices();
            return ds.UpdateNote(content, noteId, picturePath);
        }

        public static bool DeleteNote(int noteId)
        {
            DataServices ds = new DataServices();
            return ds.DeleteNote(noteId);
        }

        public int Id { get => id; set => id = value; }
        public string Content { get => content; set => content = value; }
        public string CreatedDate { get => createdDate; set => createdDate = value; }
        public string PicturePath { get => picturePath; set => picturePath = value; }
        public int CategoryId { get => categoryId; set => categoryId = value; }
    }
}