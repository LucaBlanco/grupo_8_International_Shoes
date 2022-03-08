const { readFileSync, writeFileSync, unlinkSync, existsSync } = require('fs');
const path = require('path');

const model = {
    file: path.resolve(__dirname, "../data", "users.json"),
    read: () => readFileSync(model.file),
    list: () => JSON.parse(model.read()),
    convert: data => JSON.stringify(data, null, 2),
    write: data => writeFileSync(model.file, model.convert(data)),
    all: () => {
        //return this.readFile();
        return model.list()
    },
    find(id) {
        let rows = this.readFile();
        return rows.find(row => row.id == id)
    },
    match: (propiedad, valor) => model.all().find(p => p[propiedad] == valor),
    generate: data => Object({
        id: model.list().length > 0 ? model.list().pop().id + 1 : 1,
        //model.list().sort((a,b) => a.id < b.id ? -1: a.id > b.id ? 1 : 0)
        first_name: data.first_name,
        last_name: data.last_name,
        user: data.user,
        email: data.email,
        date_of_birth: data.date_of_birth,
        country: data.country,
        providence: data.providence,
        city: data.city,
        addres: data.addres,
        password: data.password,
        pass_confirm: data.pass_confirm,

/*         files: data.files && data.files.length > 0 ? data.files.map(file => file.filename): null,
 */    }),
    create: data => {
        let lista = model.list().sort((a, b) => a.id < b.id ? -1 : a.id > b.id ? 1 : 0)
        lista.push(data),
        model.write(lista); //actualizar la lista de usuarios? con el usuario nuevo//
    },
    update: data => {
        let rows = model.list().sort((a, b) => a.id < b.id ? -1 : a.id > b.id ? 1 : 0)
        rows = rows.map((usuario) => {
            if (usuario.id == data.id) {
                usuario.first_name = data.first_name;
                usuario.last_name = data.last_name;
                usuario.user= data.user;
                usuario.email = data.email;
                usuario.date_of_birth = data.date_of_birth;
                usuario.country = data.country;
                usuario.providence = data.providence;
                usuario.city = data.city;
                usuario.addres = data.addres;
                usuario.password = data.password;
                usuario.pass_confirm = data.pass_confirm;
/*                 usuario.files=data.files && data.files.length > 0 ? data.files.map(file => file.filename): null;
 */                return usuario
            }
            return usuario;
        })
        model.write(rows)
    },
    garbage: id => {
        let rows = model.list().sort((a, b) => a.id < b.id ? -1 : a.id > b.id ? 1 : 0)
        model.write(rows.filter(usuario => usuario.id != id));
    }

}

module.exports = model;