import { useEffect, useState } from "react";
import {
  FormControl,
  IconButton,
  Input,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

function App() {
  const [webletterList, setWebletterList] = useState([]);

  const url = import.meta.env.VITE_APP_SERVER_URL;
  const token = import.meta.env.VITE_APP_API_TOKEN;

  async function getAllWebletters() {
    try {
      const res = await fetch(`${url}/api/webletters`, {
        method: "GET",
        headers: {
          Authorization: `${token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();

        setWebletterList(data.reverse());
      }
    } catch (err) {
      console.log(err);
    }
  }

  function openWebletter(id: string) {
    return window.open(`${url}/webletter/${id}`, "_blank");
  }

  useEffect(() => {
    getAllWebletters();
  }, []);

  return (
    <>
      <FormControl
        maxWidth={"70%"}
        margin={"0 auto"}
        pb={10}
        display={"flex"}
        gap={"5px"}
      >
        <Input placeholder="Тема письма" />
        <IconButton
          type="submit"
          colorScheme="green"
          aria-label="Search database"
          icon={<SearchIcon />}
        />
      </FormControl>
      <TableContainer
        maxWidth="100%"
        whiteSpace="wrap"
        style={{ padding: "0 20px" }}
      >
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th></Th>
              <Th>
                <p>Выставка</p>
              </Th>
              <Th>
                <p>Тема письма</p>
              </Th>
              <Th>
                <p>Язык</p>
              </Th>
              <Th>
                <p>Размер</p>
              </Th>
              <Th>
                <p>Дата загрузки</p>
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {webletterList.map(
              ({ id, banner, exhibition, title, size, upload_date, lang }) => (
                <Tr
                  key={id}
                  onClick={() => openWebletter(id)}
                  sx={{
                    cursor: "pointer",
                    transition: "all 0.4s linear",
                    "&:hover": {
                      opacity: 0.5,
                      backgroundColor: "#d7d7d7",
                    },
                  }}
                >
                  <Td style={{ padding: 0 }}>
                    <img
                      src={`${url}/webletter/${id}/${banner}`}
                      alt={exhibition}
                      style={{
                        maxWidth: "100px",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </Td>
                  <Td>
                    <p>{exhibition}</p>
                  </Td>
                  <Td>
                    <p>{title}</p>
                  </Td>
                  <Td>
                    <p>{lang}</p>
                  </Td>
                  <Td>
                    <p>{(size / 1e6).toFixed(2)}MB</p>
                  </Td>
                  <Td style={{ padding: 0 }}>
                    <p>
                      {`${new Date(upload_date)
                        .toLocaleTimeString()
                        .slice(0, -3)}`}{" "}
                      {`${new Date(upload_date).toLocaleDateString()}`}
                    </p>
                  </Td>
                </Tr>
              )
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}

export default App;
