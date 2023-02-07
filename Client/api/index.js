async function request(url, data, requestMethod="POST") {
  let resp;
  let request = { method: requestMethod,
    headers: { "Content-Type": "application/json" }
  };

  if(requestMethod == "POST" || requestMethod == "PUT") {
    request.body = JSON.stringify(data);
  }

    return await fetch(url, request).then((response) => {
      resp = response;
      return response.json();
    }).then((result) => { 
      if(!result) {
        throw new Error();
      }
      result.pass = true;
      if (!resp.ok) {
        result.pass = false;
      }
      return result; 
    }).catch((error) => {
      return { pass: false, Message: "Unexpected error, try again", error: JSON.stringify(error) };
    });
}

// Use "Conveyor" extension in Visual Studio in order to get IP address url instead of localhost
let API_URL = "http://10.0.0.10:45455/api";

export async function getCategories() {
  return await request(API_URL+"/categories", "", "GET");
}

export async function addCategory({name}) {
  return await request(API_URL+"/addCategory", {name});
}

export async function getNotes(categoryId) {
  return await request(API_URL+"/notes/"+categoryId, "", "GET");
}

export async function addNote({content, id, base64picture}) {
  return await request(API_URL+"/addNote", {content, id, base64picture});
}

export async function getNote(noteId) {
  return await request(API_URL+"/note/"+noteId, "", "GET");
}

export async function updateNote({content, id, base64picture}) {
  return await request(API_URL+"/updateNote", {content, id, base64picture}, "PUT");
}

export async function deleteNote(noteId) {
  return await request(API_URL+"/delete/"+noteId, "", "DELETE");
}
