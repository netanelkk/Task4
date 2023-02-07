using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Notes.Models
{
    public class RespondData<T>
    {
        private List<T> data;

        public RespondData(List<T> data)
        {
            this.data = data;
        }

        public List<T> Data { get => data; set => data = value; }
    }
}