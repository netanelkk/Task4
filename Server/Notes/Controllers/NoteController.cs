using Notes.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Hosting;
using System.Web.Http;

namespace Notes.Controllers
{
    public class NoteController : ApiController
    {
        [HttpGet]
        [Route("api/notes/{categoryId}")]
        // Get all notes
        public IHttpActionResult GetAll(int categoryId)
        {
            List<Note> notes = Note.GetAll(categoryId);
            if (notes == null)
                return BadRequest("Couldn't fetch notes");
            if (notes.Count == 0)
                return BadRequest("No notes were found");
            return Ok(new RespondData<Note>(notes));
        }

        [HttpPost]
        [Route("api/addNote")]
        // Add new note
        public IHttpActionResult Add(PostNote note)
        {
            string picturePath = "";
            if (note.Base64picture.Length > 0)
            {
                picturePath = "image_" + DateTime.Now.ToString("yyyy-MM-dd_HH-mm-ss") + ".jpg";
                var fileSavePath = Path.Combine(HostingEnvironment.MapPath("~/Content/Images"), picturePath);
                File.WriteAllBytes(fileSavePath, Convert.FromBase64String(note.Base64picture));
            }

            if (!Note.AddNote(note.Content, note.Id, picturePath))
            {
                return BadRequest("Unexpected error, try again later");
            }

            return Ok(new RespondMessage("Added successfully"));
        }

        [HttpGet]
        [Route("api/note/{noteId}")]
        // Get note by id
        public IHttpActionResult GetNote(int noteId)
        {
            Note note = Note.GetNote(noteId);
            if (note == null)
                return BadRequest("Couldn't fetch notes");
            return Ok(new RespondSingleData<Note>(note));
        }

        [HttpPut]
        [Route("api/updateNote")]
        // Update note
        public IHttpActionResult Update(PostNote note)
        {
            string picturePath = "";
            if (note.Base64picture.Length > 0)
            {
                picturePath = "image_" + DateTime.Now.ToString("yyyy-MM-dd_HH-mm-ss") + ".jpg";
                var fileSavePath = Path.Combine(HostingEnvironment.MapPath("~/Content/Images"), picturePath);
                File.WriteAllBytes(fileSavePath, Convert.FromBase64String(note.Base64picture));
            }

            if (!Note.UpdateNote(note.Content, note.Id, picturePath))
            {
                return BadRequest("Unexpected error, try again later");
            }

            return Ok(new RespondMessage("Updated successfully"));
        }

        [HttpDelete]
        [Route("api/delete/{noteId}")]
        // Delete note
        public IHttpActionResult Delete(int noteId)
        {
            if (!Note.DeleteNote(noteId))
            {
                return BadRequest("Unexpected error, try again later");
            }

            return Ok(new RespondMessage("Deleted successfully"));
        }
    }
}
