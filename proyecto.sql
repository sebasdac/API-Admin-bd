USE [master]
GO
/****** Object:  Database [Proyecto_BD]    Script Date: 6/2/2025 17:37:10 ******/
CREATE DATABASE [Proyecto_BD]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'Proyecto_BD', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVER\MSSQL\DATA\Proyecto_BD.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'Proyecto_BD_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVER\MSSQL\DATA\Proyecto_BD_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO
ALTER DATABASE [Proyecto_BD] SET COMPATIBILITY_LEVEL = 160
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [Proyecto_BD].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [Proyecto_BD] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [Proyecto_BD] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [Proyecto_BD] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [Proyecto_BD] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [Proyecto_BD] SET ARITHABORT OFF 
GO
ALTER DATABASE [Proyecto_BD] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [Proyecto_BD] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [Proyecto_BD] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [Proyecto_BD] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [Proyecto_BD] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [Proyecto_BD] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [Proyecto_BD] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [Proyecto_BD] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [Proyecto_BD] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [Proyecto_BD] SET  ENABLE_BROKER 
GO
ALTER DATABASE [Proyecto_BD] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [Proyecto_BD] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [Proyecto_BD] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [Proyecto_BD] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [Proyecto_BD] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [Proyecto_BD] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [Proyecto_BD] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [Proyecto_BD] SET RECOVERY FULL 
GO
ALTER DATABASE [Proyecto_BD] SET  MULTI_USER 
GO
ALTER DATABASE [Proyecto_BD] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [Proyecto_BD] SET DB_CHAINING OFF 
GO
ALTER DATABASE [Proyecto_BD] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [Proyecto_BD] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [Proyecto_BD] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [Proyecto_BD] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'Proyecto_BD', N'ON'
GO
ALTER DATABASE [Proyecto_BD] SET QUERY_STORE = ON
GO
ALTER DATABASE [Proyecto_BD] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [Proyecto_BD]
GO
/****** Object:  User [user]    Script Date: 6/2/2025 17:37:10 ******/
CREATE USER [user] FOR LOGIN [user] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  User [Eduardo_Arias]    Script Date: 6/2/2025 17:37:10 ******/
CREATE USER [Eduardo_Arias] FOR LOGIN [Eduardo_Arias] WITH DEFAULT_SCHEMA=[dbo]
GO
ALTER ROLE [db_owner] ADD MEMBER [user]
GO
ALTER ROLE [db_accessadmin] ADD MEMBER [user]
GO
ALTER ROLE [db_securityadmin] ADD MEMBER [user]
GO
ALTER ROLE [db_ddladmin] ADD MEMBER [user]
GO
ALTER ROLE [db_backupoperator] ADD MEMBER [user]
GO
ALTER ROLE [db_datareader] ADD MEMBER [user]
GO
ALTER ROLE [db_datawriter] ADD MEMBER [user]
GO
ALTER ROLE [db_denydatareader] ADD MEMBER [user]
GO
ALTER ROLE [db_denydatawriter] ADD MEMBER [user]
GO
/****** Object:  Table [dbo].[Empleados]    Script Date: 6/2/2025 17:37:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Empleados](
	[id_empleado] [int] NOT NULL,
	[cedula] [varchar](20) NOT NULL,
	[nombre] [varchar](100) NOT NULL,
	[email] [varchar](100) NOT NULL,
	[telefono] [varchar](20) NOT NULL,
	[cargo] [varchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[id_empleado] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[HistorialRequisitosSolicitud]    Script Date: 6/2/2025 17:37:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[HistorialRequisitosSolicitud](
	[id_historial_requisito] [int] IDENTITY(1,1) NOT NULL,
	[id_solicitud] [int] NOT NULL,
	[id_requisito] [int] NOT NULL,
	[cumplido] [bit] NOT NULL,
	[fecha_registro] [date] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id_historial_requisito] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Mensajes]    Script Date: 6/2/2025 17:37:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Mensajes](
	[id_mensaje] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [varchar](100) NOT NULL,
	[email] [varchar](100) NOT NULL,
	[mensaje] [text] NOT NULL,
	[fecha_envio] [date] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id_mensaje] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Pagos]    Script Date: 6/2/2025 17:37:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Pagos](
	[id_pago] [int] IDENTITY(1,1) NOT NULL,
	[id_solicitud] [int] NOT NULL,
	[monto] [float] NOT NULL,
	[fecha_pago] [date] NOT NULL,
	[ID_Persona] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id_pago] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Personas]    Script Date: 6/2/2025 17:37:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Personas](
	[id_persona] [int] IDENTITY(1,1) NOT NULL,
	[cedula] [varchar](20) NOT NULL,
	[nombre] [varchar](255) NOT NULL,
	[email] [varchar](255) NOT NULL,
	[telefono] [varchar](20) NOT NULL,
	[direccion] [varchar](255) NULL,
	[fecha_registro] [datetime] NULL,
	[tipo_cliente] [varchar](15) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id_persona] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Prestamo_Requisitos]    Script Date: 6/2/2025 17:37:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Prestamo_Requisitos](
	[id_prestamo] [int] NOT NULL,
	[id_requisito] [int] NOT NULL,
	[obligatorio] [bit] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id_prestamo] ASC,
	[id_requisito] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Prestamos]    Script Date: 6/2/2025 17:37:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Prestamos](
	[id_prestamo] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [varchar](100) NOT NULL,
	[plazo_meses] [int] NOT NULL,
	[interes] [float] NOT NULL,
	[tipo_interes] [varchar](10) NOT NULL,
	[porcentaje] [float] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id_prestamo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Requisitos]    Script Date: 6/2/2025 17:37:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Requisitos](
	[id_requisito] [int] IDENTITY(1,1) NOT NULL,
	[descripcion] [varchar](255) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id_requisito] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Solicitudes]    Script Date: 6/2/2025 17:37:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Solicitudes](
	[id_solicitud] [int] IDENTITY(1,1) NOT NULL,
	[id_prestamo] [int] NOT NULL,
	[estado] [varchar](20) NOT NULL,
	[fecha_solicitud] [date] NOT NULL,
	[ID_Persona] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id_solicitud] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Usuarios]    Script Date: 6/2/2025 17:37:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Usuarios](
	[id_usuario] [int] IDENTITY(1,1) NOT NULL,
	[email] [varchar](100) NOT NULL,
	[contraseña] [varchar](255) NOT NULL,
	[tipo_usuario] [varchar](20) NOT NULL,
	[ID_Persona] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id_usuario] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Personas] ON 

INSERT [dbo].[Personas] ([id_persona], [cedula], [nombre], [email], [telefono], [direccion], [fecha_registro], [tipo_cliente]) VALUES (1, N'11111111', N'Sebasprueba', N'secoto1200@gmail.com', N'12345678', N'Cocori', CAST(N'2025-02-06T14:37:28.043' AS DateTime), N'Solicitante')
INSERT [dbo].[Personas] ([id_persona], [cedula], [nombre], [email], [telefono], [direccion], [fecha_registro], [tipo_cliente]) VALUES (2, N'11111111', N'Sebasprueba', N'secoto12001@gmail.com', N'12345678', N'Cocori', CAST(N'2025-02-06T14:37:38.257' AS DateTime), N'Solicitante')
INSERT [dbo].[Personas] ([id_persona], [cedula], [nombre], [email], [telefono], [direccion], [fecha_registro], [tipo_cliente]) VALUES (3, N'305610818', N'Sebastian Coto Arias', N'secoto12@gmail.com', N'61951300', N'Cocori', CAST(N'2025-02-06T14:39:56.877' AS DateTime), N'Solicitante')
INSERT [dbo].[Personas] ([id_persona], [cedula], [nombre], [email], [telefono], [direccion], [fecha_registro], [tipo_cliente]) VALUES (4, N'11111111', N'Sebas', N'secoto1227@gmail.com', N'61951300', N'Cocori', CAST(N'2025-02-06T15:11:58.710' AS DateTime), N'Solicitante')
SET IDENTITY_INSERT [dbo].[Personas] OFF
GO
SET IDENTITY_INSERT [dbo].[Prestamos] ON 

INSERT [dbo].[Prestamos] ([id_prestamo], [nombre], [plazo_meses], [interes], [tipo_interes], [porcentaje]) VALUES (5, N'Prestamo personal', 24, 12, N'Variable', 80)
INSERT [dbo].[Prestamos] ([id_prestamo], [nombre], [plazo_meses], [interes], [tipo_interes], [porcentaje]) VALUES (6, N'Prestamo Hipotecario', 64, 6, N'Fija', 90)
INSERT [dbo].[Prestamos] ([id_prestamo], [nombre], [plazo_meses], [interes], [tipo_interes], [porcentaje]) VALUES (7, N'Prestamo para carro', 24, 15, N'Variable', 80)
SET IDENTITY_INSERT [dbo].[Prestamos] OFF
GO
SET IDENTITY_INSERT [dbo].[Solicitudes] ON 

INSERT [dbo].[Solicitudes] ([id_solicitud], [id_prestamo], [estado], [fecha_solicitud], [ID_Persona]) VALUES (3, 5, N'Pendiente', CAST(N'2025-02-06' AS Date), 1)
INSERT [dbo].[Solicitudes] ([id_solicitud], [id_prestamo], [estado], [fecha_solicitud], [ID_Persona]) VALUES (4, 5, N'Pendiente', CAST(N'2025-02-06' AS Date), 4)
SET IDENTITY_INSERT [dbo].[Solicitudes] OFF
GO
SET IDENTITY_INSERT [dbo].[Usuarios] ON 

INSERT [dbo].[Usuarios] ([id_usuario], [email], [contraseña], [tipo_usuario], [ID_Persona]) VALUES (4, N'admin@gmail.com', N'admin123', N'Administrador', NULL)
INSERT [dbo].[Usuarios] ([id_usuario], [email], [contraseña], [tipo_usuario], [ID_Persona]) VALUES (12, N'secoto12@gmail.com', N'Hairwax1"', N'Solicitante', 3)
INSERT [dbo].[Usuarios] ([id_usuario], [email], [contraseña], [tipo_usuario], [ID_Persona]) VALUES (13, N'secoto1227@gmail.com', N'Hairwax1@', N'Solicitante', 4)
SET IDENTITY_INSERT [dbo].[Usuarios] OFF
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ__Empleado__415B7BE5FD2A0AB0]    Script Date: 6/2/2025 17:37:10 ******/
ALTER TABLE [dbo].[Empleados] ADD UNIQUE NONCLUSTERED 
(
	[cedula] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ__Empleado__AB6E6164DEF0618A]    Script Date: 6/2/2025 17:37:10 ******/
ALTER TABLE [dbo].[Empleados] ADD UNIQUE NONCLUSTERED 
(
	[email] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ__Usuarios__AB6E61643650BC14]    Script Date: 6/2/2025 17:37:10 ******/
ALTER TABLE [dbo].[Usuarios] ADD UNIQUE NONCLUSTERED 
(
	[email] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Personas] ADD  DEFAULT (getdate()) FOR [fecha_registro]
GO
ALTER TABLE [dbo].[Empleados]  WITH CHECK ADD FOREIGN KEY([id_empleado])
REFERENCES [dbo].[Usuarios] ([id_usuario])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[HistorialRequisitosSolicitud]  WITH CHECK ADD FOREIGN KEY([id_requisito])
REFERENCES [dbo].[Requisitos] ([id_requisito])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[HistorialRequisitosSolicitud]  WITH CHECK ADD FOREIGN KEY([id_solicitud])
REFERENCES [dbo].[Solicitudes] ([id_solicitud])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Pagos]  WITH CHECK ADD FOREIGN KEY([id_solicitud])
REFERENCES [dbo].[Solicitudes] ([id_solicitud])
GO
ALTER TABLE [dbo].[Pagos]  WITH CHECK ADD  CONSTRAINT [FK_Personas] FOREIGN KEY([ID_Persona])
REFERENCES [dbo].[Personas] ([id_persona])
GO
ALTER TABLE [dbo].[Pagos] CHECK CONSTRAINT [FK_Personas]
GO
ALTER TABLE [dbo].[Prestamo_Requisitos]  WITH CHECK ADD FOREIGN KEY([id_prestamo])
REFERENCES [dbo].[Prestamos] ([id_prestamo])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Prestamo_Requisitos]  WITH CHECK ADD FOREIGN KEY([id_requisito])
REFERENCES [dbo].[Requisitos] ([id_requisito])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Solicitudes]  WITH CHECK ADD FOREIGN KEY([id_prestamo])
REFERENCES [dbo].[Prestamos] ([id_prestamo])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Solicitudes]  WITH CHECK ADD  CONSTRAINT [FK_SolicitudesAPersona] FOREIGN KEY([ID_Persona])
REFERENCES [dbo].[Personas] ([id_persona])
GO
ALTER TABLE [dbo].[Solicitudes] CHECK CONSTRAINT [FK_SolicitudesAPersona]
GO
ALTER TABLE [dbo].[Usuarios]  WITH CHECK ADD  CONSTRAINT [FK_UsuariosaPersonas] FOREIGN KEY([ID_Persona])
REFERENCES [dbo].[Personas] ([id_persona])
GO
ALTER TABLE [dbo].[Usuarios] CHECK CONSTRAINT [FK_UsuariosaPersonas]
GO
ALTER TABLE [dbo].[Personas]  WITH CHECK ADD CHECK  (([tipo_cliente]='Solicitante' OR [tipo_cliente]='Cliente'))
GO
/****** Object:  StoredProcedure [dbo].[AgregarUsuarioYPersona]    Script Date: 6/2/2025 17:37:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[AgregarUsuarioYPersona]
    @tipo_usuario VARCHAR(20), -- Puede ser 'Cliente', 'Solicitante' o 'Empleado'
    @cedula VARCHAR(20),
    @nombre VARCHAR(100),
    @email VARCHAR(100),
    @telefono VARCHAR(20),
    @direccion VARCHAR(255) = NULL, -- Solo para Solicitantes
    @cargo VARCHAR(50) = NULL, -- Solo para Empleados
    @contraseña VARCHAR(255)
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
        DECLARE @NuevoID INT;

        IF @tipo_usuario IN ('Cliente', 'Solicitante')
        BEGIN
            -- Insertar en Personas
            INSERT INTO Personas (cedula, nombre, email, telefono, direccion, fecha_registro, tipo_cliente)
            VALUES (@cedula, @nombre, @email, @telefono, @direccion, GETDATE(), @tipo_usuario);

            -- Obtener el ID generado
            SET @NuevoID = SCOPE_IDENTITY();
        END
        ELSE IF @tipo_usuario = 'Empleado'
        BEGIN
            -- Insertar en Empleados
            INSERT INTO Empleados (cedula, nombre, email, telefono, cargo)
            VALUES (@cedula, @nombre, @email, @telefono, @cargo);

            -- Obtener el ID generado
            SET @NuevoID = SCOPE_IDENTITY();
        END

        -- Insertar en Usuarios
        INSERT INTO Usuarios (email, contraseña, tipo_usuario, ID_Persona)
        VALUES (@email, @contraseña, @tipo_usuario, @NuevoID);

        PRINT 'Usuario agregado exitosamente';
    END TRY
    BEGIN CATCH
        PRINT 'Error al agregar usuario';
        THROW;
    END CATCH;
END;
GO
/****** Object:  StoredProcedure [dbo].[InsertarSolicitudPrestamo]    Script Date: 6/2/2025 17:37:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
 CREATE PROCEDURE [dbo].[InsertarSolicitudPrestamo]
    @id_solicitante INT,
    @id_prestamo INT,
    @estado VARCHAR(50),
    @fecha_solicitud DATE
AS
BEGIN
    SET NOCOUNT ON;
    
    INSERT INTO Solicitudes (id_solicitante, id_prestamo, estado, fecha_solicitud)
    VALUES ( @id_solicitante, @id_prestamo, @estado, @fecha_solicitud);
    
    PRINT 'Solicitud insertada correctamente.';
END;
GO
/****** Object:  StoredProcedure [dbo].[Login]    Script Date: 6/2/2025 17:37:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Login]
  @correo VARCHAR(100),
  @contrasena VARCHAR(255)
AS
BEGIN
  SET NOCOUNT ON;

  -- Verificar si el usuario existe con las credenciales correctas
  IF EXISTS (SELECT 1 FROM Usuarios WHERE email = @correo AND contraseña = @contrasena)
  BEGIN
    SELECT u.email, u.tipo_usuario, u.ID_Persona FROM 
	Usuarios u
	JOIN
	Personas p on p.id_persona = u.ID_Persona
	WHERE u.email = @correo;
  END
  ELSE
  BEGIN
    -- Si el usuario no existe o la contraseña es incorrecta
    SELECT 'Error' AS status, 'Credenciales incorrectas' AS message;
  END
END;
GO
/****** Object:  StoredProcedure [dbo].[SolicitudesPorUsuario]    Script Date: 6/2/2025 17:37:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[SolicitudesPorUsuario]
@ID_Persona int
AS
BEGIN
 select * from Solicitudes where ID_Persona = @ID_Persona
END
GO
/****** Object:  StoredProcedure [dbo].[SP_Solicitud]    Script Date: 6/2/2025 17:37:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_Solicitud]
    @ID_Solicitud INT = NULL,  -- ID para UPDATE y DELETE
    @ID_Prestamo INT = NULL,   -- ID del préstamo
    @ID_Persona INT = NULL,    -- ID de la persona que solicita
    @estado VARCHAR(15) = NULL,-- Estado de la solicitud
    @operacion INT             -- Tipo de operación (1 = INSERT, 2 = SELECT, 3 = UPDATE, 4 = DELETE)
AS
BEGIN
    SET NOCOUNT ON;

    -- INSERTAR SOLICITUD
    IF @operacion = 1
    BEGIN
        INSERT INTO Solicitudes (id_prestamo, estado, fecha_solicitud, ID_PERSONA)
        VALUES (@ID_Prestamo, @estado, GETDATE(), @ID_Persona);

        PRINT '✅ Solicitud registrada correctamente.';
    END

    -- CONSULTAR SOLICITUDES
    ELSE IF @operacion = 2
    BEGIN
        IF @ID_Solicitud IS NULL
            SELECT * FROM Solicitudes; -- Si no se especifica ID, devuelve todas las solicitudes
        ELSE
            SELECT * FROM Solicitudes WHERE id_solicitud = @ID_Solicitud; -- Si se especifica ID, devuelve solo esa solicitud
    END

    -- ACTUALIZAR SOLICITUD
    ELSE IF @operacion = 3
    BEGIN
        UPDATE Solicitudes
        SET 
            id_prestamo = ISNULL(@ID_Prestamo, id_prestamo),
            estado = ISNULL(@estado, estado),
            ID_PERSONA = ISNULL(@ID_Persona, ID_PERSONA)
        WHERE id_solicitud = @ID_Solicitud;

        PRINT '✅ Solicitud actualizada correctamente.';
    END

    -- ELIMINAR SOLICITUD
    ELSE IF @operacion = 4
    BEGIN
        DELETE FROM Solicitudes WHERE id_solicitud = @ID_Solicitud;

        PRINT '✅ Solicitud eliminada correctamente.';
    END

    -- ERROR SI LA OPERACIÓN NO ES VÁLIDA
    ELSE
    BEGIN
        PRINT '❌ Operación no válida. Usar 1 (INSERT), 2 (SELECT), 3 (UPDATE) o 4 (DELETE).';
    END
END;
GO
/****** Object:  StoredProcedure [dbo].[Ver_Prestamos]    Script Date: 6/2/2025 17:37:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[Ver_Prestamos]
 as
 BEGIN
  select * from Prestamos
 END
GO
/****** Object:  StoredProcedure [dbo].[VerUsuariosySolicitantesPorCorreo]    Script Date: 6/2/2025 17:37:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[VerUsuariosySolicitantesPorCorreo]
@correo VARCHAR(30) = NULL
AS
BEGIN
    -- Primera consulta en Solicitantes
    IF EXISTS (SELECT 1 FROM Solicitantes s JOIN Usuarios u ON u.id_usuario = s.id_solicitante WHERE u.email = @correo)
    BEGIN
        SELECT s.id_solicitante AS id, s.Nombre, 'Solicitante' AS Tipo
        FROM Solicitantes s
        JOIN Usuarios u ON u.id_usuario = s.id_solicitante
        WHERE u.email = @correo;
        RETURN; -- Termina la ejecución si encuentra un resultado
    END

    -- Segunda consulta en Clientes solo si no encontró en Solicitantes
    IF EXISTS (SELECT 1 FROM Clientes c JOIN Usuarios u ON u.id_usuario = c.id_cliente WHERE u.email = @correo)
    BEGIN
        SELECT c.id_cliente AS id, c.Nombre, 'Cliente' AS Tipo
        FROM Clientes c
        JOIN Usuarios u ON u.id_usuario = c.id_cliente
        WHERE u.email = @correo;
        RETURN;
    END

    -- Si no está en ninguno, devolver un mensaje uniforme
    SELECT NULL AS id, 'No se encontraron registros' AS Nombre, 'Ninguno' AS Tipo;
END;
GO
USE [master]
GO
ALTER DATABASE [Proyecto_BD] SET  READ_WRITE 
GO
