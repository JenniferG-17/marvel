var Villanos = Vue.component('Villanos',  {

  template:
   `
  <div>
      <h1>Villanos</h1>
      <p>Esta es la página de Villanos</p>

      <table class="table">
          <thead>
              <tr>
                  <th scope="col">Nombre</th>
                  <th scope="col">Super Poder</th>
                  <th scope="col">Origen</th>
                  <th scope="col">Derrotado Por</th>
                  <th scope="col">Acciones</th>
              </tr>
          </thead>

          <tbody>
              <tr v-for="(item, index) in villanos">
                  <td>{{ item.nombre }}</td>
                  <td>{{ item.poder }}</td>
                  <td>{{ item.origen }}</td>
                  <td>{{ item.derrotado }}</td>
                  <td><a href="/cambiar_villano"></a>
                      <router-link class="nav-link":to="{ name: 'cambiar_villano', params: { id:index }}"> <button class="btn btn-primary">Editar</button> </router-link>
                      <button class="btn btn-danger" v-on:click="eliminar_villano(index) ">Eliminar</button>
                  </td>
              </tr>
          </tbody>
      </table>
      <a href="/crear_vengador"></a>
      <router-link class="nav-link" to="/crear_villano"> <button class="btn btn-success">Agregar villano</button></router-link>

  </div>
    `,

    data: function () {
        return {
            villanos: [],
        }
    },

    mounted() {
        let self = this;
        fetch('https://marvel-e0038.firebaseio.com/villanos.json')
            .then(r => r.json())
            .then(json => {
                self.villanos = json;
            });
    },
    methods: { //Inician los Métodos
        eliminar_villano: function (id){
            let self = this;
            axios.delete('https://marvel-e0038.firebaseio.com/villanos/'+ id + '.json')
            .then((response) =>{
                alert("El villano fue eliminado");
                location.reload();
            }).catch((err) =>{
                self.loading = false; console.log(err);
            });
        } //fin metodo eliminar alumno
    }
});
