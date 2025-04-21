namespace backend.Models
{
    public class Certification
    {
        public int Id { get; set; }
        public string? Title { get; set; }
        public string? Issuer { get; set; }
        public DateTime? DateIssued { get; set; }
        public DateTime? ExpirationDate { get; set; }
        public string? CredentialUrl { get; set; }


    }


}