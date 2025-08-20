const express=require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./graphql/schema');
const sequelize = require('./config/database'); 
const cors = require('cors');



const countryRoutes = require('./routes/CountryRoutes');
const deptDesigRoutes = require('./routes/deptDesigRoutes');
const departmentRoutes = require('./routes/departmentRoutes');
const designationRoutes = require('./routes/designationRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const permissionRoutes = require('./routes/permissionRoutes');
const regionCountryRoutes = require('./routes/regionCountryRoutes');
const regionRoutes = require('./routes/regionRoutes');
const rolePermissionsRoutes = require('./routes/rolePermissionsRoutes');
const rolesRoutes = require('./routes/rolesRoutes');
const statesRoutes = require('./routes/StateRoutes');
const usersRoutes = require('./routes/usersRoutes');
const customer=require('./routes/CustomerRoutes');
const country_state_router = require('./routes/Country_StateRoutes');
const motorcycleRoutes = require('./routes/motorcycleRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/dept_desig', deptDesigRoutes);
app.use('/departments',departmentRoutes);
app.use('/designations', designationRoutes);
app.use('/employees', employeeRoutes);
app.use('/permissions', permissionRoutes);
app.use('/region-countries', regionCountryRoutes);
app.use('/regions', regionRoutes);
app.use('/role_permissions', rolePermissionsRoutes);
app.use('/roles', rolesRoutes);
app.use('/states', statesRoutes); 
app.use('/users', usersRoutes);
app.use('/countries', countryRoutes);
app.use('/country-states', country_state_router);
app.use('/customers', customer);
app.use('/motorcycles', motorcycleRoutes);
app.use('/bookings', bookingRoutes);

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true // Enable GraphiQL UI
  }));

const PORT = process.env.PORT || 3000;

sequelize.sync()
    .then(() => console.log('Database synchronized'))
    .catch(err => console.log('Error syncing database: ', err));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
