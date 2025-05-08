import { pool } from '../db.js';
//Lógica (backend) de cada endpoint
export const getPeliculas = async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM peliculas")
  res.json(rows)
}

export const getPeliculasById = async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM peliculas WHERE id = ?", [req.params.id])

  if (rows.length <= 0) return res.status(404).json({
    message: 'No existe película en este ID',
  })

  res.json(rows)
}


export const createPeliculas = async (req, res) => {
  //1. Obtener datos del JSON (input)
  const {titulo, duracionmin, clasificacion, alanzamineto} = req.body
  
  //2. Ejecutar la consulta, para valores obtenidos
  const [rows] = await pool.query("INSERT INTO peliculas (titulo, duracionmin, clasificacion, alanzamineto) VALUES (?,?,?,?)",
  [titulo, duracionmin, clasificacion, alanzamineto])

  //3. Enviar un objeto con el resultado del query
  res.send({
    id: rows.insertId,
    titulo,
    duracionmin,
    clasificacion,
    alanzamineto
  })

}

export const updatePeliculas = async (req, res) => {
const id = req.params.id
const {titulo, duracionmin, clasificacion, alanzamineto} = req.body

const querySQL = `
  UPDATE peliculas SET
    titulo = ?,
    duracionmin = ?,
    clasificacion = ?,
    alanzamineto = ?
  WHERE id = ?
`
const [result] = await pool.query(querySQL, [titulo, duracionmin, clasificacion, alanzamineto, id])
if (result.affectedRows == 0){
  return res.status(404) .json({
    message: 'El ID no existe'
  })
}

res.json({message: 'Actualización correcta' })
}

export const deletePeliculas = async (req, res) => {
const [result] = await pool.query("DELETE FROM peliculas WHERE id = ?", [req.params.id])
  if (result.affectedRows <= 0){
    return res.status(404) .json({
      message: 'No existe registro con este ID'
    })
  }

  //¿Y si borra correctamente?
  res.sendStatus(204)
}