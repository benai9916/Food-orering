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
