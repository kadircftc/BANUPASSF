using Core.Entities.Concrete;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DataAccess.Concrete.Configurations
{
    public class GroupEntityConfiguration : BaseConfiguration<Group>
    {
        public override void Configure(EntityTypeBuilder<Group> builder)
        {
            builder.Property(x => x.GroupName).HasMaxLength(50).IsRequired();
            builder.HasData(
               new Group { Id = 1, GroupName ="Personel"},
               new Group { Id = 2, GroupName ="Admin" },
               new Group { Id = 3, GroupName ="Güvenlik" },
               new Group { Id = 4, GroupName ="Güvenlik Şefi"}
               );

            base.Configure(builder);
        }
    }
}