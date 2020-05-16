var CrearVillano = Vue.component('CrearVillano', {
  data: function () { // Declaración de la data
      return {
          errores: [],
          nombre: null,
          poder: null,
          origen: null,
          derrotado: null
      }
  },

  //Aqui comenzamos nuestro template
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
                <h1>Crear Villano</h1>
            </div>
            <div class="card-body">
                <div class="form-group">
                    <label for="nombre">Nombre</label>
                    <input id="nombre" v-model="nombre" type="text" class="form-control form-control-lg">
                </div>
                <div class="form-group">
                    <label for="poder">Super Poder</label>
                    <input id="poder" v-model="poder" type="text" class="form-control form-control-lg">
                </div>
                <div class="form-group">
                    <label for="origen">origen</label>
                    <input id="origen" v-model="origen" type="text" class="form-control form-control-lg">
                </div>
                <div class="form-group">
                    <label for="derrotado">Derrotado</label>
                    <input id="derrotado" v-model="derrotado" type="text" class="form-control form-control-lg">
                </div>
                <button class="btn btn-primary" v-on:click="validarFormulario(), crear_villano(nombre, poder, origen, derrotado)">Agregar villano</button>
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
              this.errores.push("el poder es obligatorio.");
          }
          if(!this.origen){
              this.errores.push("origen es obligatorio.");
          }
          if(!this.derrotado){
              this.errores.push("derrotado es obligatorio.");
          }



          if(!this.errores.length){
              return true;
          }
      },

      crear_villano: function(nombre, poder, origen, derrotado ){
          if(!(Array.isArray(this.errores) && this.errores.length)){
              let self = this;
              axios.post('https://marvel-e0038.firebaseio.com/villanos.json',{
                  nombre:nombre,
                  poder:poder,
                  origen:origen,
                  derrotado:derrotado
              })
              .then((response) => {
                  alert("Se Agregó a la Lista Exitosamente");
                  router.push({ name: "Villanos" });
              }
              ).catch((err) => {
                  self.loading = false;
                  console.log(err);
              });
          }
      } // fin metodo crear_alumno
  } // Terminan los Métodos
});
