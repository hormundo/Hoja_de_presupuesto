let ingresos = [
    new Ingreso("Salario", 2100.00),
    new Ingreso("Venta coche", 1500)
];

const egresos = [
    new Egreso("Renta departamentos", 900),
    new Egreso("Ropa", 400)
];

let cargarApp = () => {
    cargarCabecero();
    cargarIngresos();
    cargarEgresos();
}

let totalIngresos = () => {
    let totalIngreso = 0;

    for(let ingreso of ingresos) {
        totalIngreso += ingreso.valor;
    }

    return totalIngreso;
}

let totalEgresos = () => {
    let totalEgreso = 0;

    for(let egreso of egresos) {
        totalEgreso += egreso.valor;
    }

    return totalEgreso;
}

let cargarCabecero = () => {
    let presupuesto = totalIngresos() - totalEgresos();
    let porcentajeEgreso = totalEgresos() / totalIngresos();

    document.getElementById("presupuesto").innerHTML = formatoMoneda(presupuesto);
    document.querySelector(".presupuesto_egreso--porcentaje").innerHTML = formatoPorcentaje(porcentajeEgreso);
    document.getElementById("ingresos").innerHTML = formatoMoneda( totalIngresos());
    document.getElementById("egresos").innerHTML = formatoMoneda(totalEgresos()); 
}

const formatoMoneda = valor => {
    return valor.toLocaleString("es-ES", {style: 'currency', currency:'EUR', minimumFractionDigits:2});
}

const formatoPorcentaje = valor => {
    return valor.toLocaleString("es-ES", {style: 'percent', minimumFractionDigits:1});
}

const cargarIngresos = () => {
    let ingresosHTML = "";

    for(let ingreso of ingresos) {
        ingresosHTML += crearIngresoHTML(ingreso);
    }

    document.getElementById('lista-ingresos').innerHTML = ingresosHTML;
}

const crearIngresoHTML = ingreso => {
    return ingreso = `  <div class="elemento limpiarEstilos">
                            <div class="elemento_descripcion">${ingreso.descripcion}</div>
                            <div class="derecha limpiarEstilos">
                                <div class="elemento_valor">+ ${formatoMoneda(ingreso.valor)}</div>
                                <div class="elemento_eliminar">
                                    <button id=${ingreso.id} class='elemento_eliminar--btn eliminar--ingreso-btn'>
                                        <ion-icon name="close-circle-outline"></ion-icon>
                                    </button>
                                </div>
                            </div>
                        </div>`;
}

const cargarEgresos = () => {
    let egresosHTML = "";

    for(let egreso of egresos) {
        egresosHTML += crearEgresoHTML(egreso);
    }

    document.getElementById('lista-egresos').innerHTML = egresosHTML;
}

const crearEgresoHTML = egreso => {
    return egreso = `  <div class="elemento limpiarEstilos">
                            <div class="elemento_descripcion">${egreso.descripcion}</div>          
                            <div class="derecha limpiarEstilos">
                            <div class="elemento_valor">+ ${formatoMoneda(egreso.valor)}</div>
                                <div class="elemento_porcentaje">${formatoPorcentaje(egreso.valor / totalEgresos())}</div>
                                <div class="elemento_eliminar">
                                    <button id=${egreso.id} class='elemento_eliminar--btn eliminar--egreso-btn'>
                                        <ion-icon name="close-circle-outline"></ion-icon>
                                    </button>
                                </div>
                            </div>
                        </div>`;
}

document.addEventListener("click", e => {
    if(e.target.matches(".eliminar--ingreso-btn *")) {
        let id = e.target.closest(".eliminar--ingreso-btn").id;
        eliminarIngreso(id);
    }

    if(e.target.matches(".eliminar--egreso-btn *")) {
        let id = e.target.closest(".eliminar--egreso-btn").id;
        eliminarEgreso(id);
    }
})

const eliminarIngreso = id => {
    const ingresoFiltrado = ingresos.filter((i) => {
        return id != ingresos[i].id;
      });

    ingresos = ingresoFiltrado;

    cargarCabecero();
    cargarIngresos();
}

const eliminarEgreso = id => {
    const egresoFiltrado = egresos.findIndex(egreso => egreso.id == id);

    egresos.splice(egresoFiltrado, 1);

    cargarCabecero();
    cargarEgresos()
}

const agregarDato = () => {
    let tipoOperacion = document.getElementById("tipo").value;
    let descripcion = document.getElementById("descripcion").value;
    let valor = parseFloat(document.getElementById("valor").value);

    if(!descripcion || !valor || valor <= 0  ) {
        alert("compruebe que la descripción y el valor no esten vacíos ni que sean valores negativos.");
    } else {
        if(tipoOperacion === "ingreso") {
            ingresos = [...ingresos, new Ingreso(descripcion, valor)];
            cargarIngresos()
        } else {
            egresos.push(new Egreso(descripcion, valor));
            cargarEgresos();
        }
    }

    cargarCabecero();
}