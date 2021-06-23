import addMenuDetail from '../modals/menu.js';
import mongoose from 'mongoose';


export const getMenuDetail = async(req, res) => {
    try {
        const getMenu = await addMenuDetail.find()

        res.status(200).json(getMenu)
    } catch (error) {
        res.status(404).json({ message : error })
    }
}

export const createMenuDetail = async(req, res) => {
    const data = req.body;
    
    const newMenu = new addMenuDetail(data);
    try {
        await  newMenu.save();

        res.status(201).json(newProduct);
    } catch (error) {
        res.status(409).json({ message : error })
    }
}

export const updateMenuDetail = async (req, res) => {
    const {id : _id } = req.params
    const data =  req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No product with that id');

    const updateMenu =  await addMenuDetail.findByIdAndUpdate(_id, {...data, _id} , { new: true})

    res.json(updateMenu)
}


export const deleteMenuDetail = async (req, res) => {
    const {id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No product with that id');

    await addMenuDetail.findByIdAndRemove(id);

    res.json( { message: "Product deleted successfully..!"});
}