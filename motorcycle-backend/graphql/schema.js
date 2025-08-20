const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLFloat, GraphQLBoolean, GraphQLSchema, GraphQLList, GraphQLNonNull } = require('graphql');
const Motorcycle = require('../models/product');


const MotorcycleType = new GraphQLObjectType({
  name: 'Motorcycle',
  fields: () => ({
    id: { type: GraphQLInt },
    brand: { type: GraphQLString },
    model: { type: GraphQLString },
    year: { type: GraphQLInt },
    price: { type: GraphQLFloat },
    engineCapacity: { type: GraphQLInt },
    fuelType: { type: GraphQLString },
    transmission: { type: GraphQLString },
    mileage: { type: GraphQLFloat },
    color: { type: GraphQLString },
    imageUrl: { type: GraphQLString },
    description: { type: GraphQLString },
    inStock: { type: GraphQLBoolean },
  })
});


const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    motorcycles: {
      type: new GraphQLList(MotorcycleType),
      resolve(parent, args) {
        return Motorcycle.findAll();
      }
    },
    motorcycle: {
      type: MotorcycleType,
      args: { id: { type: GraphQLInt } },
      resolve(parent, args) {
        return Motorcycle.findByPk(args.id);
      }
    }
  }
});


const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addMotorcycle: {
      type: MotorcycleType,
      args: {
        brand: { type: new GraphQLNonNull(GraphQLString) },
        model: { type: new GraphQLNonNull(GraphQLString) },
        year: { type: new GraphQLNonNull(GraphQLInt) },
        price: { type: new GraphQLNonNull(GraphQLFloat) },
        engineCapacity: { type: new GraphQLNonNull(GraphQLInt) },
        fuelType: { type: new GraphQLNonNull(GraphQLString) },
        transmission: { type: new GraphQLNonNull(GraphQLString) },
        mileage: { type: GraphQLFloat },
        color: { type: GraphQLString },
        imageUrl: { type: GraphQLString },
        description: { type: GraphQLString },
        inStock: { type: GraphQLBoolean },
      },
      resolve(parent, args) {
        return Motorcycle.create(args);
      }
    },
    deleteMotorcycle: {
      type: GraphQLString,
      args: { id: { type: GraphQLInt } },
      async resolve(parent, args) {
        const motorcycle = await Motorcycle.findByPk(args.id);
        if (!motorcycle) throw new Error('Motorcycle not found');
        await motorcycle.destroy();
        return "Motorcycle deleted";
      }
    },
    updateMotorcycle: {
      type: MotorcycleType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
        brand: { type: GraphQLString },
        model: { type: GraphQLString },
        year: { type: GraphQLInt },
        price: { type: GraphQLFloat },
        engineCapacity: { type: GraphQLInt },
        fuelType: { type: GraphQLString },
        transmission: { type: GraphQLString },
        mileage: { type: GraphQLFloat },
        color: { type: GraphQLString },
        imageUrl: { type: GraphQLString },
        description: { type: GraphQLString },
        inStock: { type: GraphQLBoolean }
      },
      async resolve(parent, args) {
        const motorcycle = await Motorcycle.findByPk(args.id);
        if (!motorcycle) throw new Error('Motorcycle not found');
        await motorcycle.update(args);
        return motorcycle;
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
