import mongoose from 'mongoose'

//  add scheme
const addSchema = mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    image: [String],
})

//  turn scheme to a model
const addMenuDetail = mongoose.model('addMenu', addSchema)

export default addMenuDetail
