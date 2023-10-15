import React from 'react';
import Card from '../Card/Card';
import style from './CardsContainer.module.css';
import { useSelector } from 'react-redux';

//Debe tomar un array de usuarios y por cada uno renderizar un componente Card
const CardsContainer = () => {

  // const drivers = [{
  //   "id": 1,
  //   "forename": "Lewis",
  //   "surname": "Hamilton",
  //   "nationality": "British",
  //   "description": "Sir Lewis Carl Davidson Hamilton MBE HonFREng (born 7 January 1985) is a British racing driver currently competing in Formula One, driving for Mercedes-AMG Petronas Formula One Team. In Formula One, Hamilton has won a joint-record seven World Drivers' Championship titles (tied with Michael Schumacher), and holds the records for the most wins (103), pole positions (103), and podium finishes (191), among many others. He is statistically considered as the most successful driver in Formula One history.",
  //   "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg",
  //   "teams": "McLaren, Mercedes",
  //   "created": false
  // },
  // {
  //   "id": 2,
  //   "forename": "Nick",
  //   "surname": "Heidfeld",
  //   "nationality": "German",
  //   "description": "Nick Lars Heidfeld (born 10 May 1977) is a German professional racing driver. Despite scoring regular podium finishes in 2005 with Williams, and in 2007 and 2008 with BMW Sauber, Heidfeld never won a race after debuting in Formula One in 2000. Heidfeld currently holds two Formula One records; most podium finishes without a Grand Prix win, and the most second-place finishes without a wi. In 2011, Heidfeld raced in Formula One for the Renault team as a replacement for the injured Robert Kubica, his former BMW Sauber teammate,before being replaced by Bruno Senna. He last drove for the Rebellion Racing team in the FIA World Endurance Championship and for Mahindra Racing Formula E Team in Formula E.",
  //   "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Nick_Heidfeld_Goodwood_Festival_of_Speed_2019_%2848242681251%29.jpg/330px-Nick_Heidfeld_Goodwood_Festival_of_Speed_2019_%2848242681251%29.jpg",
  //   "teams": "Prost, Sauber, Jordan,Williams,BMW Sauber,Renault",
  //   "created": false
  // },
  // {
  //   "id": 3,
  //   "forename": "Nico",
  //   "surname": "Rosberg",
  //   "nationality": "German",
  //   "description": "Nico Erik Rosberg (born 27 June 1985) is a German-Finnish former professional racing driver. He competed in Formula One from 2006 to 2016, winning the World Drivers' Championship in 2016 with Mercedes-AMG Petronas Motorsport. The only child of Finnish 1982 Formula One World Champion Keke Rosberg and his German wife Sina Rosberg, he was raised primarily in the Principality of Monaco.",
  //   "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Nico_Rosberg_2016.jpg/330px-Nico_Rosberg_2016.jpg",
  //   "teams": "Williams, Mercedes",
  //   "created": false
  // },
  // {
  //   "id": 4,
  //   "forename": "Fernando",
  //   "surname": "Alonso",
  //   "nationality": "Spanish",
  //   "description": "Fernando Alonso Díaz is a Spanish racing driver currently competing for Aston Martin in Formula One. He won the series' World Drivers' Championship in 2005 and 2006 with Renault, and has also driven for McLaren, Ferrari, and Minardi. With Toyota, Alonso won the 24 Hours of Le Mans twice, in 2018 and 2019, and the FIA World Endurance Championship in 2018–19. He also won the 24 Hours of Daytona with Wayne Taylor Racing in 2019.",
  //   "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Alonso_2016.jpg/360px-Alonso_2016.jpg",
  //   "teams": "Minardi, Renault, McLaren, Ferrari, Alpine",
  //   "created": false
  // },
  // {
  //   "id": 5,
  //   "forename": "Heikki",
  //   "surname": "Kovalainen",
  //   "nationality": "Finnish",
  //   "description": "Heikki Johannes Kovalainen; is a Finnish racing driver competing in the Japan Rally Championship for Rally Team AICELLO. He raced in Formula One between 2007 and 2013 for the Renault, McLaren, Team Lotus, Caterham and Lotus F1 teams, scoring a single victory at the 2008 Hungarian Grand Prix. After leaving Formula One, he raced in the Japanese Super GT series between 2015 and 2021, where he won the championship in 2016.",
  //   "image": "https://upload.wikimedia.org/wikipedia/commons/2/29/Effect_20190609_091716.jpg",
  //   "teams": "Renault, McLaren, Lotus, Caterham, Lotus",
  //   "created": false
  // },
  // {
  //   "id": 6,
  //   "forename": "Kazuki",
  //   "surname": "Nakajima",
  //   "nationality": "Japanese",
  //   "description": "Kazuki Nakajima is a retired Japanese professional racing driver who drove in Formula One for the Williams-Toyota team from 2007 to 2009. In 2012 and 2014, he won the Super Formula Championship driving for TOM'S. Racing for Toyota Gazoo Racing, he won the 2018, 2019 and 2020 24 Hours of Le Mans, as well as the 2018–19 World Endurance Championship along with team-mates Fernando Alonso and Sébastien Buemi. He is the second FIA world champion from Japan after Toshi Arai.",
  //   "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Kazuki_Nakajima_2012_WEC_Fuji.jpg/330px-Kazuki_Nakajima_2012_WEC_Fuji.jpg",
  //   "teams": "Williams",
  //   "created": false
  // },
  // {
  //   "id": 7,
  //   "forename": "Sébastien",
  //   "surname": "Bourdais",
  //   "nationality": "French",
  //   "description": "Sébastien Olivier Bourdais is a French professional racing driver. He is one of the most successful drivers in the history of American open-wheel car racing, having won 37 races. He won four successive championships under Champ Car World Series sanction from 2004 to 2007. He drove in Formula One for the Toro Rosso team during 2008, and the start of the 2009 season, returned to America in the united IndyCar Series in 2011, and has raced sports cars throughout his career, winning his home race, the 24 Hours of Le Mans in the GTE-Pro class in 2016. He last competed in the NTT IndyCar Series in 2021, driving the No. 14 car for A. J. Foyt Racing.",
  //   "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Sebastien_Bourdais_in_2021_%2851221641988%29_%28cropped%29.jpg/1024px-Sebastien_Bourdais_in_2021_%2851221641988%29_%28cropped%29.jpg",
  //   "teams": "Toro Rosso",
  //   "created": false
  // },
  // {
  //   "id": 8,
  //   "forename": "Kimi",
  //   "surname": "Räikkönen",
  //   "nationality": "Finnish",
  //   "description": "Kimi-Matias Räikkönen, nicknamed The Iceman, is a Finnish racing driver who competed in Formula One between 2001 and 2021 for Sauber, McLaren, Ferrari, Lotus, and Alfa Romeo. Räikkönen won the 2007 Formula One World Championship while driving for Ferrari; he also managed to finish second overall twice and third three times. Räikkönen is the most successful Finnish Formula One driver by several metrics,[a] and has the fifth-most podium finishes, third-most fastest laps, and second-most race starts in Formula One history. He is known for his reserved personality and reluctance to participate in public relations.",
  //   "image": "https://upload.wikimedia.org/wikipedia/commons/f/ff/F12019_Schloss_Gabelhofen_%2822%29_%28cropped%29.jpg",
  //   "teams": "Sauber, McLaren, Ferrari, Lotus, Alfa Romeo",
  //   "created": false
  // }]

  const drivers = useSelector(state => state.drivers);

  return (
    <div className={style.container}>
      {drivers.map(driver => {
        return <Card 
          id={driver.id}
          forename={driver.forename}
          surname={driver.surname}
          nationality={driver.nationality}
          image={driver.image}
        />
      })}
    </div>
  )
}

export default CardsContainer
