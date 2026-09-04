import { Usuario } from "../entities/usuario.entity";


export class UsuarioResponseDto {
    id: string | undefined;
    nombre: string | undefined;
    email: string | undefined;
    fechaCreacion: Date | undefined;
    estado: Boolean | undefined;

    static fromEntity(usuario: Usuario): UsuarioResponseDto {
        const dto = new UsuarioResponseDto();
        dto.id = usuario.id;
        dto.nombre = usuario.nombre;
        dto.email = usuario.email;
        dto.fechaCreacion = usuario.fechaCreacion;
        dto.estado = usuario.estado;
        return dto;
    }
}
