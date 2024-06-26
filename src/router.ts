import { Router } from "express";
import { body, param } from "express-validator";
import { createProduct, getProducts, getProductById, updateProduct, updateDisponibilidad, deleteProduct } from "./handlers/products";
import { handleInputErrors } from "./midleware";

const router = Router();

// Esquema para la documentacion con Swagger
/**
 * @swagger
 * components:
 *      schemas: 
 *          Product:
 *              type: object
 *              properties:
 *                  id:
 *                      type: intener
 *                      description: The product ID
 *                      example: 1
 *                  name: 
 *                      type: string
 *                      description: The product name
 *                      exaple: Monitor curvo de 49 pulgadas
 *                  price: 
 *                      type: number
 *                      description: The product price
 *                      example: 300
 *                  disponibilidad: 
 *                      type: boolean
 *                      description: The product availability
 *                      example: true
 * 
 */


// Documentación  para el endpoint de obtener productos
/**
 * @swagger
 * /api/products:
 *      get:
 *          summary: Obtiene una lista de productos
 *          tags: 
 *              - Products
 *          description: Regresa una lista de productos
 *          responses:
 *              200: 
 *                  description: Successful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                 $ref: '#/components/schemas/Product'
 */

router.get('/', getProducts );

// Documentación  para el endpoint de obtener productos mediante un ID
/**
 * @swagger
 * /api/products/{id}:
 *  get:
 *      summary: Obtiene un producto de acuerdo a su ID
 *      tags: 
 *          - Products
 *      description: Regresa un JSON con la informacion del producto consultado por su ID
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the product to retrieve
 *          required: true
 *          schema: 
 *              type: integer
 *      responses:
 *          200:
 *              description: Successful response 
 *              content: 
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'            
 *          404:
 *              description: Producto no encontrado - Not Found
 *          400:
 *              description: Bad request - Invalid ID
 */


router.get('/:id', 

    param('id')
        .isInt().withMessage('Id no válido'),

    handleInputErrors,
    getProductById
);

// Documentación para el endpoint que crea un nuevo producto en la BD
/**
 * @swagger
 * /api/products:
 *  post:
 *      summary: Create a new product
 *      tags: 
 *          - Products
 *      description: Returns a new record in the database
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name: 
 *                              type: string
 *                              example: "Monitor curvo de 49 pulgalas"
 *                          price: 
 *                             type: number
 *                             example: 399
 *      responses:
 *          201:
 *              description: Product created successfully         
 *          400:
 *              description: Bad request - Invalid input data
 */


router.post('/', 

    body('name')
        .notEmpty()
        .withMessage('El nombre de Producto no puede ir vacío'),

    body('price')
        .notEmpty().withMessage('El precio del Producto no debe ir vacío')
        .isNumeric().withMessage('Valor no válido')
        .custom( value => value > 0).withMessage('Precio no válido'),

    handleInputErrors,
    createProduct
);


// Documentación para actualizar un producto
/**
 * @swagger
 * /api/products/{id}:
 *  put:
 *      summary: Update a product
 *      tags:
 *          - Products
 *      description: Returns a updated record
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the product to retrieve
 *          required: true
 *          schema: 
 *              type: integer    
 *      requestBody: 
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: "Monitor curvo de 49 pulgadas"
 *                          price: 
 *                              type: number
 *                              example: 399
 *                          disponibilidad:
 *                              type: boolean
 *                              example: true
 *      responses:
 *          200:
 *              description: Product updated successfully
 *              content: 
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          404:
 *              description: Not found - Invalid ID
 *          400:
 *              description: Bad request - Invalid input data
 */         

router.put('/:id', 

    param('id')
        .isInt().withMessage('Id no válido'),

    body('name')
        .notEmpty().withMessage('El nombre de Producto no puede ir vacío'),

    body('price')
        .notEmpty().withMessage('El precio del Producto no debe ir vacío')
        .isNumeric().withMessage('Valor no válido')
        .custom( value => value > 0 ).withMessage('Precio no válido'),

    body('disponibilidad')
        .notEmpty().withMessage('Debe especificar la disponibilidad')
        .isBoolean().withMessage('Se espera un valor booleano'),

    handleInputErrors,
    updateProduct
);


// Documentación para el endpoint que actualiza la disponibilidad de un producto
/**
 * @swagger
 * /api/products/{id}:
 *  patch:
 *      summary: Update the product availability
 *      tags:
 *          - Products
 *      description: Actualiza la disponibilidad de un producto de acuerdo a su ID
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The product ID
 *          required: true
 *          schema:
 *              type: integer
 *      responses:
 *          200: 
 *              description: Update the product availability successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          404:
 *              description: Not found - Invalid ID
 *          400:
 *              description: Bad request - Invalid input data
 */

router.patch('/:id', 

    param('id')
        .isInt().withMessage('Id no válido'),
    
    handleInputErrors,
    updateDisponibilidad
);

// Documentación para el endpoint que elimina un producto
/**
 * @swagger
 * /api/products/{id}:
 *  delete:
 *      summary: Elimina un producto
 *      tags: 
 *          - Products
 *      description: Elimina un producto mediante su ID
 *      parameters: 
 *        - in: path
 *          name: id
 *          description: El ID del producto
 *          required: true
 *          schema:
 *              type: integer
 *      responses: 
 *          200:
 *              description: Producto eliminado correctamente
 *          404: 
 *              description: Not found - Invalid ID
 */
router.delete('/:id', 

    param('id')
        .isInt().withMessage('Id no válido'),

    handleInputErrors,
    deleteProduct
);

export { router };