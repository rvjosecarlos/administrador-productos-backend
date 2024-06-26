import { NextFunction, Request, Response } from "express";
import Product from "../models/Product.model";
import colors from "colors";


const getProducts = async ( req: Request, res: Response ) => {
    try {
        const products = await Product.findAll({
            order: [
                ['id','ASC']
            ],
            //attributes: { exclude: ['createdAt', 'updatedAt'] }
        });
        res.status(200).json({ data: products });
        return;
    } 
    catch(error){
        console.log(colors.bgRed(error));    
    }
};

const getProductById = async ( req: Request, res: Response ) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);
        if( !product ){
            res.status(404).json({ error: 'Producto no encontrado' });
            return;
        };
        res.status(200).json({ data: product });
    } 
    catch(error){
        console.log(colors.bgRed(error));    
    }
};

const createProduct = async (req: Request, res: Response) => {
    try{
        const newProduct = new Product(req.body);
        const saveProduct = await newProduct.save();
        res.status(201).json({ data: saveProduct });
    }   
    catch(error){   
        console.log(colors.bgRed(error));
    }
};

const updateProduct = async ( req: Request, res: Response ) => {
    try{
        const { id } = req.params;
        const product = await Product.findByPk(id);
        if( !product ){
            res.status(404).json({ error: 'Producto no encontrado' });
            return;
        };
        await product.update(req.body);
        await product.save();
        res.status(200).json({ data: product });
    }
    catch(error){
        console.log(colors.bgRed(error));
    }
};

const updateDisponibilidad = async ( req: Request, res: Response ) => {
    try{
        const { id } = req.params;
        const product = await Product.findByPk(id);
        if( !product ){
            res.status(404).json({ error: 'Producto no encontrado' });
            return;
        };

        product.disponibilidad = !product.dataValues.disponibilidad;
        await product.save();
        res.status(200).json({ data: product });
    }
    catch(error){
        console.log(colors.bgRed(error));
    }
};

const deleteProduct = async ( req: Request, res: Response ) => {
    try{
        const { id } = req.params;
        const product = await Product.findByPk(id);
        if( !product ){
            res.status(404).json({ error: 'Producto no encontrado' });
            return;
        };

        await product.destroy();
        res.status(200).json({ data: 'Producto eliminado' });
    }
    catch(error){
        console.log(colors.bgRed(error));
    }
};

export { createProduct, getProducts, getProductById, updateProduct, updateDisponibilidad, deleteProduct };