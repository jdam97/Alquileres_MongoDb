### AUTOMOVIL

GET: `http://127.15.15.15:4005/automoviles` _Obtener todos los automóviles disponibles para alquiler_

GET: `http://127.15.15.15:4005/automoviles/capacidad` _Mostrar todos los automóviles con una capacidad mayor a 5 personas._

GET: `http://127.15.15.15:4005/automoviles/marcas` _Listar todos los automóviles ordenados por marca y modelo_

### CLIENTES

GET: `http://127.15.15.15:4005/clientes` _Mostrar todos los clientes registrados en la base de datos._

GET: `http://127.15.15.15:4005/clientes/datos` _Obtener los datos de los clientes que realizaron al menos un alquiler_

GET: `http://127.15.15.15:4005/clientes/:dni` _Listar los clientes con el DNI específico._

### CONTRATOS

GET: `http://127.15.15.15:4005/contratos/alquileres` _Listar todos los alquileres activos junto con los datos de los clientes relacionados_

GET: `http://127.16.16.16:4600/hospedajes` _Mostrar todas las reservas pendientes con los datos del cliente y el automóvil reservado_

GET: `http://127.15.15.15:4005/contratos/reservas` _Este endpoint permite listar una reserva especifica pasandole el id_

GET: `http://127.15.15.15:4005/contratos/detalles/:ID` _Obtener los detalles del alquiler con el IDAlquiler específico_

GET: `http://127.15.15.15:4005/contratos/detalles/:id` _Obtener los detalles por el ID (otra forma)_

GET: `http://127.15.15.15:4005/contratos/costo/:id` _Obtener el costo total de un alquiler específico_

GET: `http://127.15.15.15:4005/contratos/detalles` _Obtener los detalles del alquiler que tiene fecha de inicio en '2023-07-05'_


### EMPLEADOS

GET: `http://127.15.15.15:4005/empleados` _Listar los empleados con el cargo de "Vendedor"_

GET: `http://127.15.15.15:4005/empleados/cargo` _Mostrar los empleados con cargo de "Gerente" o "Asistente"_



### REGISTROS

GET: `http://127.15.15.15:4005/registros/reservas/:dni` _Listar las reservas pendientes realizadas por un cliente específico_


### SUCURSAL

GET: `http://127.15.15.15:4005/sucursales` _Mostrar la cantidad total de automóviles disponibles en cada sucursal_
