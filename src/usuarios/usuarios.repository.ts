import { Injectable } from "@nestjs/common";
import { Usuario } from "./entities/usuario.entity";

@Injectable()
export class UsuariosRepository {
    private usuarios: Usuario[] = [];

    findAll(): Usuario [] {
        return this.usuarios;
    }

    findById(id: string): Usuario | undefined {
        return this.usuarios.find((u) => u.id == id);
    }

    save(usuario: Usuario): Usuario {
        this.usuarios.push(usuario);
        return usuario;
    }

    nextId(): string {
        return "" + this.usuarios.length;
    }
}
