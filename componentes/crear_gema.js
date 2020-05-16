var CrearGema = Vue.component('CrearGema',{
  data: function () { // Declaración de la data
      return {
          errores: [],
          nombre: null,
          poder: null,
          portador: null,
          ubicacion: null
      }
  },
  template: `
  <div class="container">
  <p v-if="errores.length">
  <b>Por favor, corrija el(los) siguiente(s) error(es): </b>
      <ul>
          <li v-for="error in errores" style="color: red;">{{ error }}</li>
      </ul>
  </p>
  <div class="card">
      <div class="card-header">
          <h1>Crear Gema</h1>
      </div>
      <div class="card-body">
            <div class="form-group">
                <label for="nombre">Nombre</label>
                <input id="nombre" v-model="nombre" type="text" class="form-control form-control-lg">
            </div>
            <div class="form-group">
                <label for="poder">Poder</label>
                <input id="poder" v-model="poder" type="text" class="form-control form-control-lg">
            </div>
            <div class="form-group">
                <label for="portador">portador</label>
                <input id="portador" v-model="portador" type="text" class="form-control form-control-lg">
            </div>
            <div class="form-group">
                <label for="ubicacion">ubicacion</label>
                <input id="ubicacion" v-model="ubicacion" type="text" class="form-control form-control-lg">
            </div>
            <button class="btn btn-primary" v-on:click="validarFormulario(), crear_gema(nombre, poder, portador, ubicacion)">Agregar gema</button>
      </div>
  </div>
</div>
  `,//Aquí termina nuestro template

  methods: { //Inician los Métodos
      validarFormulario: function (e){ //inician la función que valida el formulario
          this.errores = [];

          if(!this.nombre){
              this.errores.push("Los nombres es obligatorio.");
          }

          if(!this.poder){
              this.errores.push("el poder  es obligatorio.");
          }
          if(!this.portador){
              this.errores.push("el portador es obligatorio.");
          }
          if(!this.ubicacion){
              this.errores.push("ubiacion es obligatorio.");
          }


          if(!this.errores.length){
              return true;
          }
      },

      crear_gema: function(nombre, poder, portador, ubicacion){
          if(!(Array.isArray(this.errores) && this.errores.length)){
              let self = this;
              axios.post('https://marvel-e0038.firebaseio.com/gemas.json',{
                  nombre:nombre,
                  poder:poder,
                  portador:portador,
                  ubicacion:ubicacion
              })
              .then((response) => {
                  alert("Se Agregó a la Lista Exitosamente");
                  router.push({ name: "Gemas" });
              }
              ).catch((err) => {
                  self.loading = false;
                  console.log(err);
              });
          }
      } // fin metodo crear_alumno
  } // Terminan los Métodos
});
