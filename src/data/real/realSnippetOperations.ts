import {SnippetOperations} from '@/data/snippetOperations'
import {CreateSnippet, Snippet, SnippetDescriptor, UpdateSnippet} from '@/data/snippet'
import autoBind from 'auto-bind'

const token: string = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlNMVFQxb1A2Mi1xTEZTaUxRaG1PWCJ9.eyJpc3MiOiJodHRwczovL2Rldi1yanJkNWkxZ2RzemVkczJ3LnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw2NDhkZmM0MGZmYjdjNWZiMmViNzA3NjEiLCJhdWQiOiJodHRwczovL2luZ3Npcy1ncm91cC02LXNuaXBwZXRzLmNvbSIsImlhdCI6MTY4OTU1OTcyMSwiZXhwIjoxNjg5NjQ2MTIxLCJhenAiOiJuVkY5dXU5MUh3aDN5RVZ1Y1YyY3V0TEZZejZwUk4weSIsInNjb3BlIjoicmVhZDpzbmlwcGV0cyByZWFkOnNoYXJlZC1zbmlwcGV0cyIsImd0eSI6InBhc3N3b3JkIn0.kETg31GpPFiICV-q5VB6W7bWvrC9P3Qs9RoRjLb_eeGlKXfRZdq4dXbN8txrgznTJrjsXuhHmMAAv5ra0Yw8VVff0QX4M5vwcIX5UJSbd7pNmU5rdeM-kKHD5FZ1yQAuTbKiW01c1y2VD0BRdlG_ktENv1qxQFLoODmdANvaTGgbfixYodY0LYyE8FD3_gyEOc-BqVHwaaLd_MHdCMb2sxK3qpxnAkfxv-fya2g8ZgydT5cG7WBnZrl528r40DByHGyYMQ0RG437Tbr_Um4YvXgydlJg0xm6zv3GWz6MkXsgCa20gB8GDfK3RgNSMocev26kp7k1XHffPvWWlczxvg"

const SERVER_URL = process.env.SERVER_URL ?? "https://ingsisgroup6prod.kozow.com/manager"

export class RealSnippetOperations implements SnippetOperations {

  constructor() {
    autoBind(this)
  }


  createSnippet(createSnippet: CreateSnippet): Promise<SnippetDescriptor> {
    return new Promise(resolve => {
        const url = SERVER_URL + "/snippet";
        const requestOptions = {
          method: "POST",
          headers:{ 
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
          body: JSON.stringify(createSnippet)
        };
    
        fetch(url, requestOptions)
          .then(response => response.json())
          .then(data => {
            // Aquí puedes procesar los datos de la respuesta según tus necesidades
            resolve(data);
          })
          .catch(error => {
            console.error("Error al realizar la solicitud:", error);
          });
      });
  }

  getSnippetById(id: string): Promise<Snippet | undefined> {
    return new Promise(resolve => {
        const headers = {
            Authorization: `Bearer ${token}`
            };
            fetch(`${SERVER_URL}/snippet/${id}`, { headers })
                .then(response => response.json())
                .then(data => {
                // Aquí puedes procesar los datos recibidos según tus necesidades
                resolve(data);
                })
                .catch(error => {
                console.error("Error al realizar la solicitud:", error);
                resolve(undefined); // Si ocurre un error, puedes devolver un arreglo vacío o manejarlo de otra forma
                });
    
    })

  }

listSnippetDescriptors() : Promise<SnippetDescriptor[]>{
    return new Promise(resolve => {
        const headers = {
        Authorization: `Bearer ${token}`
        };
        fetch(SERVER_URL + "/snippet/me", { headers })
            .then(response => response.json())
            .then(data => {
            // Aquí puedes procesar los datos recibidos según tus necesidades
            resolve(data);
            })
            .catch(error => {
            console.error("Error al realizar la solicitud:", error);
            resolve([]); // Si ocurre un error, puedes devolver un arreglo vacío o manejarlo de otra forma
            });
        });
    }

    updateSnippetById(id: string, updateSnippet: UpdateSnippet): Promise<SnippetDescriptor> {
        return new Promise(resolve => {
            const url = `${SERVER_URL}/snippet`;
            const requestOptions = {
              method: "PUT",
              headers:{ 
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
              body: JSON.stringify({
                content:updateSnippet.content,
                id: id
              })
            };
        
            fetch(url, requestOptions)
              .then(response => response.json())
              .then(data => {
                // Aquí puedes procesar los datos de la respuesta según tus necesidades
                resolve(data);
              })
              .catch(error => {
                console.error("Error al realizar la solicitud:", error);
              });
          });
}
}