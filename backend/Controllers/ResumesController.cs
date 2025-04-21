using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ResumesController : ControllerBase
    {
        private readonly JsonStorageService _storage;

        public ResumesController(JsonStorageService storage)
        {
            _storage = storage;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var resumes = await _storage.GetAllAsync();
                return Ok(resumes);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Failed to retrieve resumes", error = ex.Message });
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                var resume = await _storage.GetByIdAsync(id);
                if (resume == null)
                    return NotFound(new { message = $"Resume with ID {id} not found" });

                return Ok(resume);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Failed to retrieve resume", error = ex.Message });
            }
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Resume resume)
        {
            try
            {
                var success = await _storage.AddAsync(resume);
                if (!success)
                    return StatusCode(500, new { message = "Failed to add resume" });

                return CreatedAtAction(nameof(Get), new { id = resume.Id }, resume);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Error creating resume", error = ex.Message });
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Resume updatedResume)
        {
            try
            {
                var success = await _storage.UpdateAsync(id, updatedResume);
                if (!success)
                    return NotFound(new { message = $"Resume with ID {id} not found" });

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error updating resume", error = ex.Message });
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var success = await _storage.DeleteAsync(id);
                if (!success)
                    return NotFound(new { message = $"Resume with ID {id} not found" });

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error deleting resume", error = ex.Message });
            }
        }
    }
}
