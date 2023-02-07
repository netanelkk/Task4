using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Notes.Models
{
    public class PostCategory
    {
        private string name;

        public PostCategory(string name)
        {
            this.name = name;
        }

        public string Name { get => name; set => name = value; }
    }
}