using System.Text.Json;
using backend.Models;

namespace backend.Services
{
    public class JsonStorageService
    {
        private readonly string _filePath;

        public JsonStorageService(string filePath)
        {
            _filePath = filePath;
        }

        public async Task<List<Resume>> GetAllAsync()
        {
            try
            {
                if (!File.Exists(_filePath))
                    return new List<Resume>();

                var json = await File.ReadAllTextAsync(_filePath);
                return JsonSerializer.Deserialize<List<Resume>>(json) ?? new List<Resume>();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error reading resumes: {ex.Message}");
                return new List<Resume>();
            }
        }

        public async Task<Resume?> GetByIdAsync(int id)
        {
            try
            {
                var resumes = await GetAllAsync();
                return resumes.FirstOrDefault(r => r.Id == id);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error getting resume by ID: {ex.Message}");
                return null;
            }
        }

        public async Task<bool> AddAsync(Resume resume)
        {
            try
            {
                var resumes = await GetAllAsync();
                resume.Id = resumes.Any() ? resumes.Max(r => r.Id) + 1 : 1;
                resumes.Add(resume);
                await SaveAllAsync(resumes);
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error adding resume: {ex.Message}");
                return false;
            }
        }

        public async Task<bool> UpdateAsync(int id, Resume updatedResume)
        {
            try
            {
                var resumes = await GetAllAsync();
                var index = resumes.FindIndex(r => r.Id == id);
                if (index == -1)
                    return false;

                updatedResume.Id = id;
                resumes[index] = updatedResume;
                await SaveAllAsync(resumes);
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error updating resume: {ex.Message}");
                return false;
            }
        }

        public async Task<bool> DeleteAsync(int id)
        {
            try
            {
                var resumes = await GetAllAsync();
                var resume = resumes.FirstOrDefault(r => r.Id == id);
                if (resume == null)
                    return false;

                resumes.Remove(resume);
                await SaveAllAsync(resumes);
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error deleting resume: {ex.Message}");
                return false;
            }
        }

        public async Task SaveAllAsync(List<Resume> resumes)
        {
            try
            {
                var directory = Path.GetDirectoryName(_filePath);
                if (directory != null && !Directory.Exists(directory))
                    Directory.CreateDirectory(directory);

                var json = JsonSerializer.Serialize(resumes, new JsonSerializerOptions { WriteIndented = true });
                await File.WriteAllTextAsync(_filePath, json);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error saving resumes: {ex.Message}");
                throw;
            }
        }
    }
}
