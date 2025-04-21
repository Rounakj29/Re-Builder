using backend.Services;

var builder = WebApplication.CreateBuilder(args);
var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSingleton<JsonStorageService>(provider =>
{
    var filePath = ".\\resumes.json";
    // Validate the file path
    if (!File.Exists(filePath))
    {
        // Create the file if it doesn't exist
        File.Create(filePath).Dispose();
    }
    else
    {
        // Optionally, you can validate the file content here
        var json = File.ReadAllText(filePath);
        if (string.IsNullOrEmpty(json))
        {
            // Handle empty file case
            File.WriteAllText(filePath, "[]");
        }
    }
    return new JsonStorageService(filePath);
});

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
        policy =>
        {
            policy.WithOrigins("http://localhost:5173") // your React dev server
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseRouting();

app.UseCors(MyAllowSpecificOrigins);

app.UseAuthorization();
app.MapControllers();

app.Run();
