import { NextPage } from "next";
import { useState, useEffect } from "react";
export default function home (){
    const[data, setData] = useState([])
    const [editMode, setEditMode] = useState(false)
    const[inputedData, setInputedData] = useState({
        name: "",
        email: "",
})

    const fetchData = async () => {
        const response = await fetch('/api/ambildata')
        const json = await response.json()
        setData(json)
    }

    const handleCreateData = async (e: React.FormEvent) =>{
        e.preventDefault()
        if(editMode){
            handleUpdateData()
        }
        else{
            const response = await fetch('/api/buatdata', {
                method: 'POST',
                headers:{
                    "Content-Type" : "application/json",
                },
                body: JSON.stringify({
                    name: inputedData.name,
                    email: inputedData.email,
                })
            })
            const json = await response.json()
            fetchData()
        }
    }

    const handleDeleteData = async (id: number) => {
        const response = await fetch('/api/hapusdata',{
            method: 'POST',
            headers: {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify({id})
        })
        const json = await response.json()
        fetchData()

    }

    const handleEditData = async (id: number, name:string, email:string) => {
        console.log(id, name, email)
        setInputedData({name, email})
        setEditMode(true)
    }

    const handleUpdateData = async () =>{
        const response = await fetch('/api/update', {
            method: 'POST',
            headers:{
                "Content-Type" : "application/json",
            },
            body: JSON.stringify({
                name: inputedData.name,
                email: inputedData.email,
            })
        })
        const json = await response.json()
        setInputedData({name:"", email:""})
        setEditMode(false)
        fetchData()
    }

    useEffect(() => {
        fetchData()

    }, [])

    return(
        <div>
            <h1>Data Akun Peminjam</h1>
            <div>
                <form onSubmit={handleCreateData}>
                    <input
                    value={inputedData.name || ""} 
                    type="text" 
                    placeholder="Nama" 
                    onChange={(e)=> setInputedData({ ...inputedData, name: e.target.value})} />
                    <input
                    value={inputedData.email || ""}
                    type="text"
                    placeholder="Email"
                    onChange={(e)=> setInputedData({ ...inputedData, email: e.target.value})} />
                    <button type="submit">Submit</button>
                </form>
            </div>
            <div>
                
                {data.map(({id, name, email})=>{
                return <div key={id}>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card border-0 shadow-sm rounded-3">
                            <div className="card-body">
                                <table border={1}>
                                    <tbody>
                                        <tr>
                                            <td>{name}</td>
                                            <td>{email}</td>
                                            <td>
                                                <button onClick={()=>handleDeleteData(id)}> Hapus </button>
                                                <button onClick={()=>handleEditData(id, name, email)}>Edit</button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                })}
            </div>
        </div>
    )
}