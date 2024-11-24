using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccess.Migrations.Ms
{
    /// <inheritdoc />
    public partial class FirstCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "MultiVisiterses",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    VisitId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    VisitorFullName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MultiVisiterses", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "VisitConfirms",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    VisitId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    SecurityId = table.Column<int>(type: "int", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VisitConfirms", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Visits",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    PersonnelId = table.Column<int>(type: "int", nullable: false),
                    VisitorFullName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    VisitorLicensePlate = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    VehicleEntry = table.Column<bool>(type: "bit", nullable: false),
                    MultiPersonVisit = table.Column<bool>(type: "bit", nullable: false),
                    IsConfirm = table.Column<bool>(type: "bit", nullable: false),
                    ApprovalDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ExitDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    VisitStartDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    VisitEndDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Visits", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MultiVisiterses");

            migrationBuilder.DropTable(
                name: "VisitConfirms");

            migrationBuilder.DropTable(
                name: "Visits");
        }
    }
}
