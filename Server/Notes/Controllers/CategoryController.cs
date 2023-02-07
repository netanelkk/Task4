using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Notes.Models;

namespace Notes.Controllers
{
    public class CategoryController : ApiController
    {
        [HttpGet]
        [Route("api/categories")]
        // Get all categories
        public IHttpActionResult GetAll()
        {
            List<Category> categories = Category.GetAll();
            if (categories == null)
                return BadRequest("Couldn't fetch categories list");
            if (categories.Count == 0)
                return BadRequest("No categories were found");
            return Ok(new RespondData<Category>(categories));
        }

        [HttpPost]
        [Route("api/addCategory")]
        // Add new category
        public IHttpActionResult Add(PostCategory category)
        {
            if (!Category.AddCategory(category.Name))
            {
                return BadRequest("Unexpected error, try again later");
            }

            return Ok(new RespondMessage("Added successfully"));
        }
    }
}
