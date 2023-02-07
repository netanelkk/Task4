using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Notes.Models
{
    public class PostNote
    {
        private string content;
        private int id;
        private string base64picture;

        public PostNote(string content, int id, string base64picture)
        {
            this.content = content;
            this.id = id;
            this.base64picture = base64picture;
        }

        public string Content { get => content; set => content = value; }
        public int Id { get => id; set => id = value; }
        public string Base64picture { get => base64picture; set => base64picture = value; }
    }
}