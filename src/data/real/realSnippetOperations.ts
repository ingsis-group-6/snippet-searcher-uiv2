import {SnippetOperations} from '@/data/snippetOperations'
import {CreateSnippet, Snippet, SnippetDescriptor, UpdateSnippet} from '@/data/snippet'
import autoBind from 'auto-bind'

const token: string = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlNMVFQxb1A2Mi1xTEZTaUxRaG1PWCJ9.eyJpc3MiOiJodHRwczovL2Rldi1yanJkNWkxZ2RzemVkczJ3LnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw2NDg4YjMxNDZkZWM2ODcxNDE0ZjFkYzYiLCJhdWQiOiJodHRwczovL2luZ3Npcy1ncm91cC02LXNuaXBwZXRzLmNvbSIsImlhdCI6MTY4ODY3NDc4NywiZXhwIjoxNjg4NzYxMTg3LCJhenAiOiJuVkY5dXU5MUh3aDN5RVZ1Y1YyY3V0TEZZejZwUk4weSIsInNjb3BlIjoicmVhZDpzbmlwcGV0cyByZWFkOnNoYXJlZC1zbmlwcGV0cyIsImd0eSI6InBhc3N3b3JkIn0.l7RL2tPQNCvHyevLHw9iODvVRkcVPh2LMUZPKHw9d9oQ6VmbthwTbqxgBpdw6IIC5JJglvUqc4hc9IgO1HwDLe31Q8tn3143t5Nbx7JZVJd4PI9Hbrg9bKq2oeZd_QWg3rNzdJpHXE4XvBY-2wrMT2gDCZKE7vCzx5CYZa10rivChbxyZjeLTksHyx_-_QhTkbh5sYEnABiF2iifkI6Q6cir7WrZELT2r_6gT3QRBHLz3bmqnJl6gceS-NyZ2dF_bhpZ7_W-l6Rvv8m6afm5N84FO2nySvkzk-U25-LO9eQ4WMtrE6VrWaQMMHYiQP3p7MMzy3d7Tm71K2NJwzAPEw"

export class RealSnippetOperations implements SnippetOperations {

  constructor() {
    autoBind(this)
  }


  createSnippet(createSnippet: CreateSnippet): Promise<SnippetDescriptor> {
    return new Promise(resolve => {
        const url = "http://localhost:8081/snippet";
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
            fetch(`http://localhost:8081/snippet/${id}`, { headers })
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
        fetch("http://localhost:8081/snippet/me", { headers })
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
            const url = `http://localhost:8081/snippet`;
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