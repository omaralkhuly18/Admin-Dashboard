  import { getFirestore, collection, getDocs } from "firebase/firestore";
  import app from "../../firebaseConfig"; // مسار إعدادات Firebase

  const db = getFirestore(app);

  export const fetchData = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    const rows = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return rows;
  };

  export const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "age", headerName: "Age", type: "number", width: 100 },
    { field: "phone", headerName: "Phone", width: 150 },
    { field: "address", headerName: "Address", width: 200 },
    { field: "city", headerName: "City", width: 120 },
    { field: "zipCode", headerName: "Zip Code", width: 100 },
  ];  


  export const rows = [
    {
      id: `{id}`,
      name: `{name}`,
      email: `{email}`,
      age: `{age}`,
      phone: `{phone}`,
      address:`{address}`,
      city: `{city}`,
      zipCode: `{zipCode}`,
      
    }
    // {
    //   id: 2,
    //   name: "Cersei Lannister",
    //   email: "cerseilannister@gmail.com",
    //   age: 42,
    //   phone: "(421)314-2288",
    //   address: "1234 Main Street, New York, NY 10001",
    //   city: "New York",
    //   zipCode: "13151",
      
    // },
    // {
    //   id: 3,
    //   name: "Jaime Lannister",
    //   email: "jaimelannister@gmail.com",
    //   age: 45,
    //   phone: "(422)982-6739",
    //   address: "3333 Want Blvd, Estanza, NAY 42125",
    //   city: "New York",
    //   zipCode: "87281",
    //   registrarId: 4132513,
    // },
    // {
    //   id: 4,
    //   name: "Anya Stark",
    //   email: "anyastark@gmail.com",
    //   age: 16,
    //   phone: "(921)425-6742",
    //   address: "1514 Main Street, New York, NY 22298",
    //   city: "New York",
    //   zipCode: "15551",
      
    // },
    // {
    //   id: 5,
    //   name: "Daenerys Targaryen",
    //   email: "daenerystargaryen@gmail.com",
    //   age: 31,
    //   phone: "(421)445-1189",
    //   address: "11122 Welping Ave, Tenting, CD 21321",
    //   city: "Tenting",
    //   zipCode: "14215",
      
    // },
    // {
    //   id: 6,
    //   name: "Ever Melisandre",
    //   email: "evermelisandre@gmail.com",
    //   age: 150,
    //   phone: "(232)545-6483",
    //   address: "1234 Canvile Street, Esvazark, NY 10001",
    //   city: "Esvazark",
    //   zipCode: "10001",
      
    // },
    // {
    //   id: 7,
    //   name: "Ferrara Clifford",
    //   email: "ferraraclifford@gmail.com",
    //   age: 44,
    //   phone: "(543)124-0123",
    //   address: "22215 Super Street, Everting, ZO 515234",
    //   city: "Evertin",
    //   zipCode: "51523",
      
    // },
    // {
    //   id: 8,
    //   name: "Rossini Frances",
    //   email: "rossinifrances@gmail.com",
    //   age: 36,
    //   phone: "(222)444-5555",
    //   address: "4123 Ever Blvd, Wentington, AD 142213",
    //   city: "Esteras",
    //   zipCode: "44215",
    //   registrarId: 512315,
    // },
    // {
    //   id: 9,
    //   name: "Harvey Roxie",
    //   email: "harveyroxie@gmail.com",
    //   age: 65,
    //   phone: "(444)555-6239",
    //   address: "51234 Avery Street, Cantory, ND 212412",
    //   city: "Colunza",
    //   zipCode: "111234",
    //   registrarId: 928397,
    // },
    // {
    //   id: 10,
    //   name: "Enteri Redack",
    //   email: "enteriredack@gmail.com",
    //   age: 42,
    //   phone: "(222)444-5555",
    //   address: "4123 Easer Blvd, Wentington, AD 142213",
    //   city: "Esteras",
    //   zipCode: "44215",
    //   registrarId: 533215,
    // },
    // {
    //   id: 11,
    //   name: "Steve Goodman",
    //   email: "stevegoodmane@gmail.com",
    //   age: 11,
    //   phone: "(444)555-6239",
    //   address: "51234 Fiveton Street, CunFory, ND 212412",
    //   city: "Colunza",
    //   zipCode: "1234",
    //   registrarId: 92197,
    // },
  ];

