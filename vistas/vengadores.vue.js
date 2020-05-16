var Vengadores = Vue.component('Vengadores',  {

  template:
   `
  <div>
      <h1>Vengadores</h1>
      <p>Esta es la página de Vengadores</p>

      <table class="table">
          <thead>
              <tr>
                  <th scope="col">Nombres</th>
                  <th scope="col">Apellidos</th>
                  <th scope="col">Nombre de Superheroe</th>
                  <th scope="col">trabajo Actual</th>
                  <th scope="col">Telefono</th>
                  <th scope="col">Email</th>
                  <th scope="col">Acciones</th>
              </tr>
          </thead>

          <tbody>
              <tr v-for="(item, index) in vengadores">
                  <td>{{ item.nombres }}</td>
                  <td>{{ item.apellidos }}</td>
                  <td>{{ item.heroe }}</td>
                  <td>{{ item.trabajo }}</td>
                  <td>{{ item.telefono }}</td>
                    <td>{{ item.email }}</td>
                  <td><a href="/cambiar_vengador"></a>
                      <router-link class="nav-link":to="{ name: 'cambiar_vengador', params: { id:index }}"> <button class="btn btn-primary">Editar</button> </router-link>
                      <button class="btn btn-danger" v-on:click="eliminar_vengador(index) ">Eliminar</button>
                  </td>
              </tr>
          </tbody>
      </table>
      <a href="/crear_vengador"></a>
      <router-link class="nav-link" to="/crear_vengador"> <button class="btn btn-success">Agregar vengador</button></router-link>

  </div>
    `,

    data: function () {
        return {
            vengadores: [],
        }
    },

    mounted() {
        let self = this;
        fetch('https://marvel-e0038.firebaseio.com/vengadores.json')
            .then(r => r.json())
            .then(json => {
                self.vengadores = json;
            });
    },
    methods: { //Inician los Métodos
        eliminar_vengador: function (id){
            let self = this;
            axios.delete('https://marvel-e0038.firebaseio.com/vengadores/'+ id + '.json')
            .then((response) =>{
                alert("El vengador fue eliminado");
                location.reload();
            }).catch((err) =>{
                self.loading = false; console.log(err);
            });
        } //fin metodo eliminar alumno
    }
});
