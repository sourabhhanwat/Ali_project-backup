import React from "react";
import {
  Page,
  Text,
  Document,
  StyleSheet} from "@react-pdf/renderer";
import { DataTableCell } from "@david.kucsai/react-pdf-table/lib/DataTableCell";
import { TableHeader } from "@david.kucsai/react-pdf-table/lib/TableHeader";
import { Table, TableBody, TableCell } from "@david.kucsai/react-pdf-table";
import { TableRow } from "@david.kucsai/react-pdf-table/lib/TableRow";
// import { Table, TableCell, TableBody } from "@material-ui/core";
// import { platform } from "os";

// const POSTER_PATH = "https://image.tmdb.org/t/p/w154";

// Font.register({
//   family: 'Oswald',
//   src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf'
// });

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    // fontFamily: 'Oswald'
  },
  author: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 18,
    margin: 12,
    // fontFamily: 'Oswald'
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: 'justify',
    fontFamily: 'Times-Roman'
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'center',
    color: 'grey',
  },

  table : {
    height: 20,
  },

  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  },
});

export function PdfDocument(props : any) {
  console.log("pdf generation props", props.data);

  return (
    <Document>
      <Page style={styles.body}>
       {props.data
          ? 
          <> 
            <Text style={styles.header} fixed>
                       ~Created with react-pdf ~
            </Text><Text style={styles.title}>Project Title</Text>
            <Text style={styles.author}>RBUI Assessment Summary Report for 
                <Text style={styles.author}>{props.data.name}</Text>
            </Text>
            <Text style={styles.text}>Project Name:  
          
            </Text>
            <Text style={styles.text}>platform Name:  {props.data.name}</Text>
            <Text style={styles.text}>Description: {props.data.description}</Text>
            {/* <Text style={styles.text}>Platform Type:  </Text> */}
            <Text style={styles.text}>Field Name:  {props.data.field_name}</Text>
            <Text style={styles.text}>Installation Date: {props.data.platform_installation_date}</Text>
            {/* <Text style={styles.text}>Number of Legs: {props.data.number_of_legs_type.name}</Text>
            <Text style={styles.text}>Design Life:  {props.data.corrosion.platform_design_life}</Text>
            <Text style={styles.text}>Last underwater Inspection: {props.data.last_inspection.last_underwater_inspection_date}</Text> */}
            <Text style={styles.text}>RBUI Assessment date: {props.data.description}</Text>
            
            <Text style={styles.subtitle}>Likelihood of Failure</Text>
            
            <Text style={styles.text}>Robustness Score {props.data.robustness_score}</Text>
            <Text style={styles.text}>Platform Vintage: {props.data.platform_vintage_score}</Text>
            <Text style={styles.text}>Brace/Legs
            
            </Text>
            <Text style={styles.text}>Grouted Piles
            </Text>
            <Text style={styles.text}>Shallow Gas Loop {props.data.shallow_gas_score}</Text>
            
            <Text style={styles.text}>Condition Score</Text>
            <Text style={styles.text}>Last Inspection: 
            </Text>
            <Text style={styles.text}>Mechanical Damage: {props.data.mechanical_damage_score}</Text>
            <Text style={styles.text}>Corrosion: {props.data.corrosion_score}</Text>
            <Text style={styles.text}>Marine Growth: {props.data.marine_growths_score}</Text>
            <Text style={styles.text}>Scour: {props.data.scour_score}</Text>
            <Text style={styles.text}>Flooded Member: {props.data.flooded_member_score}</Text>
            <Text style={styles.text}>Unprotected Appurtenances: 
             
            </Text>
            
            <Text style={styles.text}>Loading Score: {props.data.loading_score}</Text>
            <Text style={styles.text}>Deck Load: 
            </Text>
            <Text style={styles.text}>Deck Elevation - Wave in Deck </Text>
            <Text style={styles.text}>Additional Appurtenances: 
            </Text>
            <Text style={styles.text}>Fatigue Load: 
            </Text>
            
            <Text style={styles.text}>RSR Override Score: {props.data.rsr_override_score}</Text>
            <Text style={styles.text}>Total Score: {props.data.total_score}</Text>
            <Text style={styles.text}>Likelihood of Failure Category </Text>
            
            <Text style={styles.subtitle}>Consequence of Failure</Text>

            <Table
                data={[
                    {firstName: "John", lastName: "Smith", dob: new Date(2000, 1, 1), country: "Australia", phoneNumber: "xxx-0000-0000"}
                ]}
            >
                <TableHeader textAlign={"center"}>
                    <TableCell weighting={0.3}>
                    </TableCell>
                    <TableCell weighting={0.3}>
                    </TableCell>
                    <TableCell>
                    </TableCell>
                    <TableCell>
                    </TableCell>
                    <TableCell>
                    </TableCell>
                </TableHeader>
                <TableBody>
                    <DataTableCell style={{border: '1px solid black', height: '12%', width: '1rem'}}weighting={0.3} getContent={(r) => ''}/>
                    <DataTableCell weighting={0.3} getContent={(r) => ''}/>
                    <DataTableCell weighting={0.3} getContent={(r) => ''}/>
                    <DataTableCell weighting={0.3} getContent={(r) => ''}/>
                    <DataTableCell weighting={0.3} getContent={(r) => ''}/>
                </TableBody>
            </Table>
            
           </>
                     
          : ""}
      </Page>
    </Document>
  );
}