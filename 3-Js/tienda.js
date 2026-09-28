const productos = [
  {
    nombre: "Cabezal Sparring",
    description: "Cabezal de Sparring.",
    categoria: "Protectores",
    marca: "Gran Marc",
    talle: ["1", "2", "3"],
    precio: 35000,
    web: "https://www.granmarctiendaonline.com.ar/productos/cabezal-cerrado/",
    imagen: "cabezal-cerrado.webp",
  },
  {
    nombre: "Dobok Dan",
    description: "Dobok aprobado para torneos internacionales.",
    categoria: "Dobok",
    marca: "Daedo",
    talle: ["1", "2", "3", "4", "5", "6", "7", "8"],
    precio: 115000,
    web: "https://www.daedo.com/products/taitf-10813",
    imagen: "dobok.webp",
  },
  {
    nombre: "Escudo de Potencia",
    description: "Escudo de potencia para entrenamientos.",
    categoria: "Entrenamiento",
    marca: "Gran Marc",
    talle: ["s/talle"],
    precio: 51700,
    web: "https://www.granmarctiendaonline.com.ar/productos/escudo-de-potencia-grande/",
    imagen: "escudo-potencia.webp",
  },
  {
    nombre: "Par de focos redondos",
    description: "Par de focos de 25cm x 25cm para hacer entrenamiento.",
    categoria: "Entrenamiento",
    marca: "Gran Marc",
    talle: ["s/talle"],
    precio: 15000,
    web: "https://www.granmarctiendaonline.com.ar/productos/foco-con-dedos/",
    imagen: "foco-con-dedos.webp",
  },
  {
    nombre: "Guantes 10 onzas",
    description:
      "Guantes de Sparring de 10 onzas habilitados para torneos internacionales",
    categoria: "Protectores",
    marca: "Daedo",
    talle: ["s/talle"],
    precio: 35000,
    web: "https://www.daedo.com/products/pritf-2020",
    imagen: "protectores-manos.webp",
  },
  {
    nombre: "Protectores Pie",
    description: "Protectores de Pie habilitados para torneos internacionales",
    categoria: "Protectores",
    marca: "Daedo",
    talle: ["XXS", "XS", "S", "M", "L", "XL"],
    precio: 35000,
    web: "https://www.daedo.com/collections/collection-itf-gloves/products/pritf-2022",
    imagen: "protectores-manos.webp",
  },
];
function mostrarModal(num) {
  if (!productos[num]) return;
  document.getElementById("nombre-producto").innerText = productos[num].nombre;
  document.getElementById("descripcion-producto").innerText = productos[num].description;
  document.getElementById("precio-producto").innerText = formatearPrecio(productos[num].precio);
  document.getElementById("modal").showModal();
}

/*
 * cerrar un modal con el detalle del producto
 * @method cerrarModal
 */
function cerrarModal() {
  document.getElementById("modal").close();
}
const formatoPrecio = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  minimumFractionDigits: 2,
});

function formatearPrecio(precio) {
  return formatoPrecio.format(precio);
}

function mostrarMensaje(texto) {
  document.getElementById("mensaje").textContent = texto;
}

function actualizarContador() {
  document.getElementById("contador-carrito").textContent = leerCarrito().length;
}

function mostrarCatalogo(lista = productos){
  let contenido = "";
  if (lista.length === 0) {
    contenido = "<p>No se encontraron productos.</p>";
  }
  lista.forEach((producto) => {
    const id = productos.indexOf(producto);
    contenido += `<div>
     <img src="https://ucc-tallerdesarrolloweb.github.io/filminas/images/ejercicios/${producto.imagen}" alt="${producto.nombre}">
     <h3>${producto.nombre}</h3>
     <p>${formalPrice(producto.precio)}</p>
    <button type="button" onclick="mostrarModal(${id})">Ver detalle</button>
    <button type="button" onclick="agregarALCarrito(${id})">Agregar al carrito</button>
    </div>`
  });
  document.getElementById("catalogo").innerHTML = contenido;
}
function leerCarrito() {
  let carritoList;
  try {
    carritoList = JSON.parse(localStorage.getItem("carrito"));
  } catch (error) {
    return [];
  }
  if (!Array.isArray(carritoList)) {
    return [];
  }
  return carritoList.filter((num) => Number.isInteger(num) && num >= 0 && num < productos.length);
}

// Se conservan los índices repetidos para leer también los carritos anteriores.
function guardarCarrito(carritoList) {
  try {
    if (carritoList.length > 0) {
      localStorage.setItem("carrito", JSON.stringify(carritoList));
    } else {
      localStorage.removeItem("carrito");
    }
    actualizarContador();
    return true;
  } catch (error) {
    mostrarMensaje("No se pudo guardar el carrito. Revisá que el navegador permita guardar datos de este sitio.");
    return false;
  }
}

function agregarALCarrito(num) {
  if (!Number.isInteger(num) || num < 0 || num >= productos.length) {
    return;
  }
  let carritoList = leerCarrito();
  carritoList.push(num);
  if (guardarCarrito(carritoList)) {
    mostrarMensaje(`${productos[num].nombre} agregado al carrito.`);
  }
}
function mostrarCarrito() {
  let carritoList = leerCarrito();
  actualizarContador();
  let contenido = "";
  if (carritoList.length === 0) {
    contenido = '<p class="resumen">Tu carrito está vacío. <a href="productos.html">Ver productos</a></p>';
  }
  else{
  let total = 0;
  const cantidades = new Map();
  carritoList.forEach((num) => cantidades.set(num, (cantidades.get(num) || 0) + 1));
  cantidades.forEach((cantidad, num) => {
    const subtotal = productos[num].precio * cantidad;
    total += subtotal;
    contenido += `<div>
    <h3>${productos[num].nombre}</h3>
    <p>Precio unitario: ${formatearPrecio(productos[num].precio)}</p>
    <p>Cantidad: ${cantidad}</p>
    <p>Subtotal: ${formatearPrecio(subtotal)}</p>
    <button type="button" onclick="eliminarproducto(${num})">Eliminar una unidad</button>
    </div>`
  });
  contenido += `<section class="resumen"><h2>Total: ${formatearPrecio(total)}</h2>
    <p>${carritoList.length} unidades en el carrito</p>
    <button type="button" onclick="vaciarcarrito()">Vaciar carrito</button></section>`;
  }
  document.getElementById("carrito").innerHTML = contenido;
}
function vaciarcarrito() {
  if (guardarCarrito([])) {
    mostrarCarrito();
    mostrarMensaje("Carrito vaciado.");
  }
}
function eliminarproducto(id) {
  let carritoList = leerCarrito();
  const posicion = carritoList.indexOf(id);
  if (posicion === -1) {
    return;
  }
  carritoList.splice(posicion, 1);
  if (guardarCarrito(carritoList)) {
    mostrarCarrito();
    mostrarMensaje("Se eliminó una unidad del producto.");
  }
}
function filtrarProducto() {
  let searchWord = document.getElementById("search").value.trim();
  let min = document.getElementById("price-min").value;
  let max = document.getElementById("price-max").value;
  let marca = document.getElementById("marca").value;
  let prot = document.getElementById("protectores").checked;
  let entr = document.getElementById("entrenamiento").checked;
  let dob = document.getElementById("dobok").checked;
  let newlista = productos;
  const minimo = document.getElementById("price-min");
  const maximo = document.getElementById("price-max");
  maximo.setCustomValidity("");
  if (!minimo.validity.valid || !maximo.validity.valid) {
    mostrarMensaje("Ingresá precios válidos, mayores o iguales a cero.");
    return;
  }
  if (min !== "" && max !== "" && Number(min) > Number(max)) {
    maximo.setCustomValidity("El máximo debe ser mayor o igual al mínimo.");
    mostrarMensaje("El precio máximo debe ser mayor o igual al mínimo.");
    return;
  }
  mostrarMensaje("");
if(searchWord){
  newlista = newlista.filter((prod) => prod.nombre.toLowerCase().includes(searchWord.toLowerCase()));
}
if(min){
  newlista = newlista.filter((prod) => prod.precio >= min);
}
if(max){
  newlista = newlista.filter((prod) => prod.precio <= max);
}

if(marca !== "todas"){
  newlista = newlista.filter((prod) => prod.marca.toLowerCase() === marca.toLowerCase());
}
let categorias = [];
prot ? categorias.push("Protectores") : "";
entr ? categorias.push("Entrenamiento") : "";
dob ? categorias.push("Dobok") : "";
if(categorias.length > 0){
  newlista = newlista.filter((prod) => categorias.includes(prod.categoria));
}
const orden = document.getElementById("orden").value;
// Ordenar una copia evita cambiar los índices guardados en el carrito.
newlista = [...newlista];
if (orden === "precio-asc") newlista.sort((a, b) => a.precio - b.precio);
if (orden === "precio-desc") newlista.sort((a, b) => b.precio - a.precio);
if (orden === "nombre-asc") newlista.sort((a, b) => a.nombre.localeCompare(b.nombre, "es"));
if (orden === "nombre-desc") newlista.sort((a, b) => b.nombre.localeCompare(a.nombre, "es"));
mostrarCatalogo(newlista);
}

function limpiarFiltros() {
  document.getElementById("filter").reset();
  filtrarProducto();
}
let formalPrice = (price) => {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS"
  }).format(price);
};

// Al abrir cada página, dibujar su contenido después de cargar el HTML.
document.addEventListener("DOMContentLoaded", () => {
  actualizarContador();
  if (document.getElementById("catalogo")) filtrarProducto();
  if (document.getElementById("carrito")) mostrarCarrito();
});
let contarProductos = () => {
  let carritoList = localStorage.getItem("carrito");
  carritoList = JSON.parse(carritoList);
  if(carritoList.length > 0){
    document.getElementById("cant-pro").innerHTML = `Hay ${carritoList.length} productos en el carrito`;
  }
  else{
    document.getElementById("cant-pro").innerHTML = "";
  }
}