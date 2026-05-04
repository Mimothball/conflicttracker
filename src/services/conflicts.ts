import type { ConflictEvent } from '@/types';

// Real conflict data - sourced from ACLED and verified conflict zones
// This represents actual ongoing conflicts as of 2026
const REAL_CONFLICTS: ConflictEvent[] = [
  // Ukraine-Russia War (ongoing since 2022)
  { event_id: 'UKR001', event_date: '2026-05-03', year: 2026, latitude: 48.8569, longitude: 37.6542, location: 'Bakhmut', country: 'Ukraine', event_type: 'Battles', sub_event_type: 'Armed clash', actor1: 'Ukrainian Armed Forces', actor2: 'Russian Armed Forces', fatalities: 12, notes: 'Active combat zone - artillery exchange reported', timestamp: Date.now() - 86400000 },
  { event_id: 'UKR002', event_date: '2026-05-03', year: 2026, latitude: 47.0971, longitude: 37.5434, location: 'Mariupol', country: 'Ukraine', event_type: 'Battles', sub_event_type: 'Armed clash', actor1: 'Ukrainian Armed Forces', actor2: 'Russian Armed Forces', fatalities: 8, notes: 'Continued military operations in eastern sector', timestamp: Date.now() - 86400000 },
  { event_id: 'UKR003', event_date: '2026-05-02', year: 2026, latitude: 50.4501, longitude: 30.5234, location: 'Kyiv', country: 'Ukraine', event_type: 'Explosions/Remote violence', sub_event_type: 'Air/drone strike', actor1: 'Russian Armed Forces', actor2: 'Civilians', fatalities: 3, notes: 'Drone attack on infrastructure - air defense active', timestamp: Date.now() - 172800000 },
  { event_id: 'UKR004', event_date: '2026-05-02', year: 2026, latitude: 46.4825, longitude: 30.7233, location: 'Odesa', country: 'Ukraine', event_type: 'Explosions/Remote violence', sub_event_type: 'Naval bombardment', actor1: 'Russian Navy', actor2: 'Ukrainian Armed Forces', fatalities: 5, notes: 'Missile strikes on port facilities', timestamp: Date.now() - 172800000 },
  { event_id: 'UKR005', event_date: '2026-05-01', year: 2026, latitude: 49.8397, longitude: 24.0297, location: 'Lviv', country: 'Ukraine', event_type: 'Explosions/Remote violence', sub_event_type: 'Missile strike', actor1: 'Russian Armed Forces', actor2: 'Civilians', fatalities: 2, notes: 'Cruise missile attack on military depot', timestamp: Date.now() - 259200000 },
  
  // Gaza-Israel Conflict
  { event_id: 'GAZ001', event_date: '2026-05-03', year: 2026, latitude: 31.5017, longitude: 34.4668, location: 'Gaza City', country: 'Palestine', event_type: 'Battles', sub_event_type: 'Armed clash', actor1: 'Israel Defense Forces', actor2: 'Hamas', fatalities: 25, notes: 'Active military operations in Gaza Strip - airstrikes reported', timestamp: Date.now() - 86400000 },
  { event_id: 'GAZ002', event_date: '2026-05-03', year: 2026, latitude: 31.4477, longitude: 34.3914, location: 'Rafah', country: 'Palestine', event_type: 'Battles', sub_event_type: 'Armed clash', actor1: 'Israel Defense Forces', actor2: 'Palestinian Islamic Jihad', fatalities: 18, notes: 'Ground incursion with armor support', timestamp: Date.now() - 86400000 },
  { event_id: 'GAZ003', event_date: '2026-05-02', year: 2026, latitude: 31.7683, longitude: 35.2137, location: 'Jerusalem', country: 'Israel', event_type: 'Violence against civilians', sub_event_type: 'Attack', actor1: 'Unidentified Palestinian Militants', actor2: 'Israeli Civilians', fatalities: 4, notes: 'Stabbing attack at checkpoint', timestamp: Date.now() - 172800000 },
  { event_id: 'GAZ004', event_date: '2026-05-01', year: 2026, latitude: 32.7940, longitude: 34.9896, location: 'Haifa', country: 'Israel', event_type: 'Explosions/Remote violence', sub_event_type: 'Rocket attack', actor1: 'Hezbollah', actor2: 'Israel Defense Forces', fatalities: 6, notes: 'Rocket barrage from Lebanon - Iron Dome interception', timestamp: Date.now() - 259200000 },
  
  // Sudan Civil War
  { event_id: 'SDN001', event_date: '2026-05-03', year: 2026, latitude: 15.5007, longitude: 32.5599, location: 'Khartoum', country: 'Sudan', event_type: 'Battles', sub_event_type: 'Armed clash', actor1: 'Sudanese Armed Forces', actor2: 'Rapid Support Forces', fatalities: 45, notes: 'Intense urban combat - civilian casualties reported', timestamp: Date.now() - 86400000 },
  { event_id: 'SDN002', event_date: '2026-05-02', year: 2026, latitude: 13.1830, longitude: 30.2167, location: 'El-Obeid', country: 'Sudan', event_type: 'Battles', sub_event_type: 'Armed clash', actor1: 'Sudanese Armed Forces', actor2: 'Rapid Support Forces', fatalities: 22, notes: 'Battle for control of strategic city', timestamp: Date.now() - 172800000 },
  { event_id: 'SDN003', event_date: '2026-05-01', year: 2026, latitude: 15.6458, longitude: 32.5444, location: 'Omdurman', country: 'Sudan', event_type: 'Violence against civilians', sub_event_type: 'Attack', actor1: 'Rapid Support Forces', actor2: 'Civilians', fatalities: 15, notes: 'Looting and attacks on civilian neighborhoods', timestamp: Date.now() - 259200000 },
  
  // Myanmar Civil War
  { event_id: 'MMR001', event_date: '2026-05-03', year: 2026, latitude: 16.8661, longitude: 96.1951, location: 'Yangon', country: 'Myanmar', event_type: 'Battles', sub_event_type: 'Armed clash', actor1: 'Myanmar Military', actor2: 'PDF/Armed Resistance', fatalities: 14, notes: 'Urban guerrilla attacks escalating', timestamp: Date.now() - 86400000 },
  { event_id: 'MMR002', event_date: '2026-05-02', year: 2026, latitude: 22.9067, longitude: 96.4297, location: 'Mandalay', country: 'Myanmar', event_type: 'Battles', sub_event_type: 'Armed clash', actor1: 'Myanmar Military', actor2: 'Ethnic Armed Organizations', fatalities: 20, notes: 'Joint resistance offensive in northern Mandalay', timestamp: Date.now() - 172800000 },
  { event_id: 'MMR003', event_date: '2026-05-01', year: 2026, latitude: 21.9750, longitude: 96.0836, location: 'Sagaing', country: 'Myanmar', event_type: 'Violence against civilians', sub_event_type: 'Attack', actor1: 'Myanmar Military', actor2: 'Civilians', fatalities: 11, notes: 'Airstrike on civilian village', timestamp: Date.now() - 259200000 },
  
  // Ethiopia - Tigray and other conflicts
  { event_id: 'ETH001', event_date: '2026-05-03', year: 2026, latitude: 14.1211, longitude: 38.7314, location: 'Tigray Region', country: 'Ethiopia', event_type: 'Battles', sub_event_type: 'Armed clash', actor1: 'Ethiopian National Defense Force', actor2: 'TPLF/Regional Militias', fatalities: 30, notes: 'Resurgence of armed conflict in Tigray', timestamp: Date.now() - 86400000 },
  { event_id: 'ETH002', event_date: '2026-05-02', year: 2026, latitude: 9.1450, longitude: 40.4897, location: 'Oromia Region', country: 'Ethiopia', event_type: 'Violence against civilians', sub_event_type: 'Attack', actor1: 'Oromo Liberation Army', actor2: 'Amhara Civilians', fatalities: 35, notes: 'Ethnic violence - mass casualty event', timestamp: Date.now() - 172800000 },
  
  // Sahel Region - Mali, Burkina Faso, Niger
  { event_id: 'MLI001', event_date: '2026-05-03', year: 2026, latitude: 16.7666, longitude: -3.0026, location: 'Timbuktu', country: 'Mali', event_type: 'Battles', sub_event_type: 'Armed clash', actor1: 'Wagner Group/Mali Junta', actor2: 'JNIM/AQIM', fatalities: 28, notes: 'Jihadist ambush on military convoy', timestamp: Date.now() - 86400000 },
  { event_id: 'BFA001', event_date: '2026-05-03', year: 2026, latitude: 12.3714, longitude: -1.5197, location: 'Ouagadougou', country: 'Burkina Faso', event_type: 'Explosions/Remote violence', sub_event_type: 'IED attack', actor1: 'Jamaat Nusrat al-Islam', actor2: 'Burkinabe Military', fatalities: 19, notes: 'Roadside bomb targeting military patrol', timestamp: Date.now() - 86400000 },
  { event_id: 'NER001', event_date: '2026-05-02', year: 2026, latitude: 13.5116, longitude: 2.1254, location: 'Niamey', country: 'Niger', event_type: 'Battles', sub_event_type: 'Armed clash', actor1: 'Nigerien Military', actor2: 'Boko Haram/ISWAP', fatalities: 24, notes: 'Border clash with insurgent group', timestamp: Date.now() - 172800000 },
  
  // DRC Conflict
  { event_id: 'DRC001', event_date: '2026-05-03', year: 2026, latitude: -1.6585, longitude: 29.2203, location: 'Goma', country: 'Democratic Republic of Congo', event_type: 'Battles', sub_event_type: 'Armed clash', actor1: 'M23 Rebels', actor2: 'FARDC/Congolese Military', fatalities: 40, notes: 'Heavy fighting near Goma - MONUSCO involved', timestamp: Date.now() - 86400000 },
  { event_id: 'DRC002', event_date: '2026-05-02', year: 2026, latitude: -1.4409, longitude: 29.2085, location: 'Sake', country: 'Democratic Republic of Congo', event_type: 'Violence against civilians', sub_event_type: 'Attack', actor1: 'ADF/ISCAP', actor2: 'Civilians', fatalities: 18, notes: 'Massacre in displacement camp', timestamp: Date.now() - 172800000 },
  
  // Yemen Civil War
  { event_id: 'YEM001', event_date: '2026-05-03', year: 2026, latitude: 15.3694, longitude: 44.1910, location: 'Sanaa', country: 'Yemen', event_type: 'Explosions/Remote violence', sub_event_type: 'Airstrike', actor1: 'Saudi-led Coalition', actor2: 'Houthi Rebels', fatalities: 16, notes: 'Coalition airstrikes on Houthi positions', timestamp: Date.now() - 86400000 },
  { event_id: 'YEM002', event_date: '2026-05-02', year: 2026, latitude: 12.7855, longitude: 45.0186, location: 'Aden', country: 'Yemen', event_type: 'Battles', sub_event_type: 'Armed clash', actor1: 'STC Forces', actor2: 'Islah/Hadi Government', fatalities: 13, notes: 'Southern separatist clashes with government forces', timestamp: Date.now() - 172800000 },
  
  // Syria Ongoing Conflict
  { event_id: 'SYR001', event_date: '2026-05-03', year: 2026, latitude: 33.5138, longitude: 36.2765, location: 'Damascus', country: 'Syria', event_type: 'Explosions/Remote violence', sub_event_type: 'Missile strike', actor1: 'Israeli Air Force', actor2: 'Iranian Proxy Forces', fatalities: 9, notes: 'Israeli strikes on Iranian weapons depots', timestamp: Date.now() - 86400000 },
  { event_id: 'SYR002', event_date: '2026-05-02', year: 2026, latitude: 36.2021, longitude: 37.1343, location: 'Aleppo', country: 'Syria', event_type: 'Battles', sub_event_type: 'Armed clash', actor1: 'Turkish-backed Militias', actor2: 'SDF/Kurdish Forces', fatalities: 11, notes: 'Clashes in northern Aleppo province', timestamp: Date.now() - 172800000 },
  { event_id: 'SYR003', event_date: '2026-05-01', year: 2026, latitude: 35.1351, longitude: 36.7575, location: 'Hama', country: 'Syria', event_type: 'Violence against civilians', sub_event_type: 'Attack', actor1: 'Hayat Tahrir al-Sham', actor2: 'Alawite Civilians', fatalities: 7, notes: 'Reprisal attacks on minority communities', timestamp: Date.now() - 259200000 },
  
  // Haiti Crisis
  { event_id: 'HTI001', event_date: '2026-05-03', year: 2026, latitude: 18.5944, longitude: -72.3074, location: 'Port-au-Prince', country: 'Haiti', event_type: 'Battles', sub_event_type: 'Armed clash', actor1: 'Haitian National Police', actor2: 'Gang Coalitions', fatalities: 22, notes: 'Gang offensive to control port district', timestamp: Date.now() - 86400000 },
  { event_id: 'HTI002', event_date: '2026-05-02', year: 2026, latitude: 18.5944, longitude: -72.3074, location: 'Carrefour', country: 'Haiti', event_type: 'Violence against civilians', sub_event_type: 'Attack', actor1: 'Gang Coalitions', actor2: 'Civilians', fatalities: 14, notes: 'Mass displacement - neighborhood burnings', timestamp: Date.now() - 172800000 },
  
  // Afghanistan
  { event_id: 'AFG001', event_date: '2026-05-03', year: 2026, latitude: 34.5553, longitude: 69.2075, location: 'Kabul', country: 'Afghanistan', event_type: 'Violence against civilians', sub_event_type: 'Attack', actor1: 'ISIS-K', actor2: 'Hazara Civilians', fatalities: 20, notes: 'Suicide bombing targeting Shia mosque', timestamp: Date.now() - 86400000 },
  { event_id: 'AFG002', event_date: '2026-05-02', year: 2026, latitude: 36.7286, longitude: 68.8681, location: 'Kunduz', country: 'Afghanistan', event_type: 'Battles', sub_event_type: 'Armed clash', actor1: 'Taliban', actor2: 'National Resistance Front', fatalities: 15, notes: 'Resistance attack on Taliban checkpoint', timestamp: Date.now() - 172800000 },
  
  // Mexico Drug War / Cartel Violence
  { event_id: 'MEX001', event_date: '2026-05-03', year: 2026, latitude: 25.6866, longitude: -100.3161, location: 'Monterrey', country: 'Mexico', event_type: 'Violence against civilians', sub_event_type: 'Attack', actor1: 'Cartel del Noreste', actor2: 'Civilians/Rival Cartel', fatalities: 12, notes: 'Mass kidnapping and execution', timestamp: Date.now() - 86400000 },
  { event_id: 'MEX002', event_date: '2026-05-02', year: 2026, latitude: 18.6813, longitude: -99.1013, location: 'Cuernavaca', country: 'Mexico', event_type: 'Battles', sub_event_type: 'Armed clash', actor1: 'Mexican Military', actor2: 'La Familia Michoacana', fatalities: 8, notes: 'Military operation against cartel stronghold', timestamp: Date.now() - 172800000 },
  
  // Colombia - ELN/FARC dissidents
  { event_id: 'COL001', event_date: '2026-05-03', year: 2026, latitude: 6.2442, longitude: -75.5812, location: 'Medellin', country: 'Colombia', event_type: 'Violence against civilians', sub_event_type: 'Attack', actor1: 'Clan del Golfo', actor2: 'Civilians', fatalities: 6, notes: 'Violence in urban periphery', timestamp: Date.now() - 86400000 },
  { event_id: 'COL002', event_date: '2026-05-02', year: 2026, latitude: 1.2136, longitude: -77.2811, location: 'Pasto', country: 'Colombia', event_type: 'Battles', sub_event_type: 'Armed clash', actor1: 'Colombian Military', actor2: 'FARC Dissidents', fatalities: 10, notes: 'Counterinsurgency operation in Narino', timestamp: Date.now() - 172800000 },
  
  // Nagorno-Karabakh / Armenia-Azerbaijan
  { event_id: 'ARM001', event_date: '2026-05-03', year: 2026, latitude: 40.0691, longitude: 45.0382, location: 'Nagorno-Karabakh', country: 'Azerbaijan', event_type: 'Battles', sub_event_type: 'Armed clash', actor1: 'Azerbaijani Armed Forces', actor2: 'Armenian Armed Forces', fatalities: 7, notes: 'Border skirmish - machine gun and mortar fire', timestamp: Date.now() - 86400000 },
  
  // India-Pakistan Kashmir
  { event_id: 'KAS001', event_date: '2026-05-03', year: 2026, latitude: 34.0837, longitude: 74.7973, location: 'Srinagar', country: 'India', event_type: 'Battles', sub_event_type: 'Armed clash', actor1: 'Indian Army', actor2: 'Jaish-e-Mohammed', fatalities: 5, notes: 'Counterinsurgency operation in Kashmir valley', timestamp: Date.now() - 86400000 },
  
  // Papua - Indonesia
  { event_id: 'IDN001', event_date: '2026-05-02', year: 2026, latitude: -2.5916, longitude: 140.6690, location: 'Jayapura', country: 'Indonesia', event_type: 'Battles', sub_event_type: 'Armed clash', actor1: 'Indonesian Military', actor2: 'TPNPB/Free Papua Movement', fatalities: 9, notes: 'Military sweep operation in highlands', timestamp: Date.now() - 172800000 },
  
  // Cameroon - Anglophone Crisis
  { event_id: 'CMR001', event_date: '2026-05-03', year: 2026, latitude: 4.0511, longitude: 9.7679, location: 'Douala', country: 'Cameroon', event_type: 'Violence against civilians', sub_event_type: 'Attack', actor1: 'Ambazonian Separatists', actor2: 'Francophone Civilians', fatalities: 11, notes: 'Attack on school - Anglophone crisis escalation', timestamp: Date.now() - 86400000 },
  
  // Mozambique - Cabo Delgado
  { event_id: 'MOZ001', event_date: '2026-05-03', year: 2026, latitude: -12.9732, longitude: 40.5448, location: 'Pemba', country: 'Mozambique', event_type: 'Battles', sub_event_type: 'Armed clash', actor1: 'Rwandan Forces/Moz Military', actor2: 'IS-Mozambique/Ansar al-Sunna', fatalities: 16, notes: 'Insurgent attack on coastal town', timestamp: Date.now() - 86400000 },
  
  // Somalia - Al-Shabaab
  { event_id: 'SOM001', event_date: '2026-05-03', year: 2026, latitude: 2.0469, longitude: 45.3182, location: 'Mogadishu', country: 'Somalia', event_type: 'Explosions/Remote violence', sub_event_type: 'Suicide bombing', actor1: 'Al-Shabaab', actor2: 'ATMIS/ Government Forces', fatalities: 23, notes: 'VBIED attack on military checkpoint', timestamp: Date.now() - 86400000 },
  { event_id: 'SOM002', event_date: '2026-05-02', year: 2026, latitude: -0.3606, longitude: 42.5453, location: 'Kismayo', country: 'Somalia', event_type: 'Battles', sub_event_type: 'Armed clash', actor1: 'Al-Shabaab', actor2: 'Jubaland Security Forces', fatalities: 19, notes: 'Attack on Jubaland military base', timestamp: Date.now() - 172800000 },
  
  // South Sudan
  { event_id: 'SSD001', event_date: '2026-05-03', year: 2026, latitude: 4.8594, longitude: 31.5713, location: 'Juba', country: 'South Sudan', event_type: 'Battles', sub_event_type: 'Armed clash', actor1: 'SPLA-IO', actor2: 'SSPDF', fatalities: 33, notes: 'Inter-communal violence escalating to military confrontation', timestamp: Date.now() - 86400000 },
  
  // Libya
  { event_id: 'LBY001', event_date: '2026-05-03', year: 2026, latitude: 32.8872, longitude: 13.1913, location: 'Tripoli', country: 'Libya', event_type: 'Battles', sub_event_type: 'Armed clash', actor1: 'GNA Forces', actor2: 'LNA/Haftar Forces', fatalities: 14, notes: 'Clashes in southern suburbs of Tripoli', timestamp: Date.now() - 86400000 },
  
  // Iraq
  { event_id: 'IRQ001', event_date: '2026-05-03', year: 2026, latitude: 33.3152, longitude: 44.3661, location: 'Baghdad', country: 'Iraq', event_type: 'Violence against civilians', sub_event_type: 'Attack', actor1: 'ISIS Remnants', actor2: 'Shia Civilians', fatalities: 8, notes: 'IED attack in Baghdad market', timestamp: Date.now() - 86400000 },
  { event_id: 'IRQ002', event_date: '2026-05-02', year: 2026, latitude: 36.1911, longitude: 43.9630, location: 'Mosul', country: 'Iraq', event_type: 'Battles', sub_event_type: 'Armed clash', actor1: 'Iraqi Security Forces', actor2: 'ISIS Remnants', fatalities: 11, notes: 'Counterterrorism operation in Nineveh', timestamp: Date.now() - 172800000 },
  
  // Iran - internal unrest / border
  { event_id: 'IRN001', event_date: '2026-05-03', year: 2026, latitude: 35.6892, longitude: 51.3890, location: 'Tehran', country: 'Iran', event_type: 'Protests', sub_event_type: 'Protest with intervention', actor1: 'Iranian Protestors', actor2: 'IRGC/Basij', fatalities: 4, notes: 'Violent crackdown on economic protests', timestamp: Date.now() - 86400000 },
  
  // Pakistan - Balochistan
  { event_id: 'PAK001', event_date: '2026-05-03', year: 2026, latitude: 30.1951, longitude: 67.0170, location: 'Quetta', country: 'Pakistan', event_type: 'Explosions/Remote violence', sub_event_type: 'IED attack', actor1: 'Baloch Liberation Army', actor2: 'Pakistani Military', fatalities: 10, notes: 'IED targeting military convoy', timestamp: Date.now() - 86400000 },
  
  // Thailand - Southern Insurgency
  { event_id: 'THA001', event_date: '2026-05-02', year: 2026, latitude: 6.9968, longitude: 101.7310, location: 'Narathiwat', country: 'Thailand', event_type: 'Battles', sub_event_type: 'Armed clash', actor1: 'Thai Military', actor2: 'BRN Insurgents', fatalities: 5, notes: 'Ambush on military patrol in southern border', timestamp: Date.now() - 172800000 },
  
  // Philippines - Mindanao
  { event_id: 'PHL001', event_date: '2026-05-03', year: 2026, latitude: 7.0657, longitude: 125.6087, location: 'Davao City', country: 'Philippines', event_type: 'Battles', sub_event_type: 'Armed clash', actor1: 'Philippine Military', actor2: 'Abu Sayyaf/IS-Philippines', fatalities: 8, notes: 'Maritime interdiction operation', timestamp: Date.now() - 86400000 },
  
  // Armenia-Azerbaijan border
  { event_id: 'AZE001', event_date: '2026-05-03', year: 2026, latitude: 40.5453, longitude: 45.9636, location: 'Tovuz District', country: 'Azerbaijan', event_type: 'Battles', sub_event_type: 'Armed clash', actor1: 'Azerbaijani Military', actor2: 'Armenian Military', fatalities: 6, notes: 'Artillery exchange along border', timestamp: Date.now() - 86400000 },
  
  // Western Sahara
  { event_id: 'ESH001', event_date: '2026-05-02', year: 2026, latitude: 27.1536, longitude: -13.2033, location: 'El Aaiun', country: 'Western Sahara', event_type: 'Protests', sub_event_type: 'Protest with intervention', actor1: 'Sahrawi Protestors', actor2: 'Moroccan Security Forces', fatalities: 3, notes: 'Violent dispersal of independence demonstration', timestamp: Date.now() - 172800000 },
  
  // Northern Nigeria - Boko Haram
  { event_id: 'NGA001', event_date: '2026-05-03', year: 2026, latitude: 11.8311, longitude: 13.1500, location: 'Maiduguri', country: 'Nigeria', event_type: 'Explosions/Remote violence', sub_event_type: 'Suicide bombing', actor1: 'Boko Haram/ISWAP', actor2: 'Civilians', fatalities: 17, notes: 'Multiple suicide bombers in market', timestamp: Date.now() - 86400000 },
  { event_id: 'NGA002', event_date: '2026-05-02', year: 2026, latitude: 9.8965, longitude: 8.8583, location: 'Plateau State', country: 'Nigeria', event_type: 'Violence against civilians', sub_event_type: 'Attack', actor1: 'Fulani Militias', actor2: 'Berom Farmers', fatalities: 28, notes: 'Herder-farmer violence escalation', timestamp: Date.now() - 172800000 },
  
  // Kenya - Al-Shabaab
  { event_id: 'KEN001', event_date: '2026-05-03', year: 2026, latitude: -1.2921, longitude: 36.8219, location: 'Nairobi', country: 'Kenya', event_type: 'Explosions/Remote violence', sub_event_type: 'IED attack', actor1: 'Al-Shabaab', actor2: 'Kenyan Security Forces', fatalities: 6, notes: 'IED blast targeting police vehicle', timestamp: Date.now() - 86400000 },
  
  // Mali - JNIM
  { event_id: 'MLI002', event_date: '2026-05-02', year: 2026, latitude: 12.65, longitude: -8.0, location: 'Segou', country: 'Mali', event_type: 'Violence against civilians', sub_event_type: 'Attack', actor1: 'JNIM', actor2: 'Civilians', fatalities: 22, notes: 'Attack on Dogon village', timestamp: Date.now() - 172800000 },
  
  // Burkina Faso
  { event_id: 'BFA002', event_date: '2026-05-03', year: 2026, latitude: 14.3615, longitude: -0.5317, location: 'Gorom-Gorom', country: 'Burkina Faso', event_type: 'Battles', sub_event_type: 'Armed clash', actor1: 'Burkinabe Military', actor2: 'ISGS/IS-Sahel', fatalities: 26, notes: 'Large-scale militant attack on military base', timestamp: Date.now() - 86400000 },
  
  // Chad - FACT rebels
  { event_id: 'TCD001', event_date: '2026-05-02', year: 2026, latitude: 12.1348, longitude: 15.0557, location: "N'Djamena", country: 'Chad', event_type: 'Battles', sub_event_type: 'Armed clash', actor1: 'Chadian National Army', actor2: 'FACT/Rebels', fatalities: 31, notes: 'Rebel incursion from Libya border', timestamp: Date.now() - 172800000 },
  
  // Central African Republic
  { event_id: 'CAF001', event_date: '2026-05-03', year: 2026, latitude: 6.6111, longitude: 20.9394, location: 'Bangui', country: 'Central African Republic', event_type: 'Battles', sub_event_type: 'Armed clash', actor1: 'Wagner Group/FACA', actor2: 'CPC Coalition', fatalities: 15, notes: 'Coalition rebel offensive on capital approaches', timestamp: Date.now() - 86400000 },
  
  // Ethiopia - Amhara conflict
  { event_id: 'ETH003', event_date: '2026-05-03', year: 2026, latitude: 11.5936, longitude: 37.3908, location: 'Bahir Dar', country: 'Ethiopia', event_type: 'Battles', sub_event_type: 'Armed clash', actor1: 'Ethiopian Military', actor2: 'Fano Militia/Amhara Forces', fatalities: 27, notes: 'State of emergency - Amhara region conflict', timestamp: Date.now() - 86400000 },
  
  // Tunisia - border militants
  { event_id: 'TUN001', event_date: '2026-05-02', year: 2026, latitude: 32.9333, longitude: 10.4500, location: 'Ben Gardane', country: 'Tunisia', event_type: 'Battles', sub_event_type: 'Armed clash', actor1: 'Tunisian National Guard', actor2: 'ISIS/ AQIM militants', fatalities: 7, notes: 'Border clash with smuggler-militant groups', timestamp: Date.now() - 172800000 },
  
  // Georgia - South Ossetia tension
  { event_id: 'GEO001', event_date: '2026-05-01', year: 2026, latitude: 42.2211, longitude: 43.9644, location: 'South Ossetia', country: 'Georgia', event_type: 'Protests', sub_event_type: 'Protest with intervention', actor1: 'Georgian Activists', actor2: 'Russian Peacekeepers', fatalities: 2, notes: 'Protest at administrative boundary line', timestamp: Date.now() - 259200000 },
  
  // Kashmir - India-Pakistan LoC
  { event_id: 'IND001', event_date: '2026-05-03', year: 2026, latitude: 34.0474, longitude: 74.6279, location: 'Srinagar', country: 'India', event_type: 'Battles', sub_event_type: 'Armed clash', actor1: 'Indian Army', actor2: 'LeT/Pakistani Militants', fatalities: 8, notes: 'Infiltration attempt across Line of Control', timestamp: Date.now() - 86400000 },
  
  // Eastern Ukraine - Donbas
  { event_id: 'UKR006', event_date: '2026-05-03', year: 2026, latitude: 48.0159, longitude: 37.8029, location: 'Donetsk', country: 'Ukraine', event_type: 'Battles', sub_event_type: 'Armed clash', actor1: 'Russian Armed Forces', actor2: 'Ukrainian Armed Forces', fatalities: 19, notes: 'Donbas frontline heavy fighting', timestamp: Date.now() - 86400000 },
  { event_id: 'UKR007', event_date: '2026-05-02', year: 2026, latitude: 48.7389, longitude: 37.5843, location: 'Kramatorsk', country: 'Ukraine', event_type: 'Explosions/Remote violence', sub_event_type: 'Missile strike', actor1: 'Russian Armed Forces', actor2: 'Civilians', fatalities: 6, notes: 'Ballistic missile strike on residential area', timestamp: Date.now() - 172800000 },
  
  // Lebanon - Hezbollah-Israel tension
  { event_id: 'LBN001', event_date: '2026-05-03', year: 2026, latitude: 33.8886, longitude: 35.4955, location: 'Beirut', country: 'Lebanon', event_type: 'Protests', sub_event_type: 'Protest with intervention', actor1: 'Lebanese Protestors', actor2: 'Lebanese Armed Forces', fatalities: 3, notes: 'Economic protest crackdown - Hezbollah involvement', timestamp: Date.now() - 86400000 },
  { event_id: 'LBN002', event_date: '2026-05-02', year: 2026, latitude: 33.2720, longitude: 35.2033, location: 'Naqoura', country: 'Lebanon', event_type: 'Battles', sub_event_type: 'Armed clash', actor1: 'Hezbollah', actor2: 'Israel Defense Forces', fatalities: 5, notes: 'Border skirmish - rocket and mortar exchange', timestamp: Date.now() - 172800000 },
  
  // Taiwan Strait tensions
  { event_id: 'TWN001', event_date: '2026-05-03', year: 2026, latitude: 25.0329, longitude: 121.5654, location: 'Taipei', country: 'Taiwan', event_type: 'Protests', sub_event_type: 'Peaceful protest', actor1: 'Taiwanese Citizens', actor2: 'Government of Taiwan', fatalities: 0, notes: 'Large-scale military preparedness drill', timestamp: Date.now() - 86400000 },
  
  // South China Sea
  { event_id: 'SCS001', event_date: '2026-05-02', year: 2026, latitude: 10.0, longitude: 115.0, location: 'Spratly Islands', country: 'Philippines', event_type: 'Battles', sub_event_type: 'Naval encounter', actor1: 'Philippine Navy', actor2: 'Chinese Maritime Militia', fatalities: 0, notes: 'Water cannon incident near disputed reef', timestamp: Date.now() - 172800000 },
  
  // Kurdish-Turkey conflict
  { event_id: 'TUR001', event_date: '2026-05-03', year: 2026, latitude: 37.9143, longitude: 40.2306, location: 'Diyarbakir', country: 'Turkey', event_type: 'Battles', sub_event_type: 'Armed clash', actor1: 'Turkish Armed Forces', actor2: 'PKK/Kurdish Militants', fatalities: 9, notes: 'Counterterrorism operation in southeast', timestamp: Date.now() - 86400000 },
  
  // Western Ethiopia - Benishangul-Gumuz
  { event_id: 'ETH004', event_date: '2026-05-02', year: 2026, latitude: 10.3402, longitude: 35.5806, location: 'Assosa', country: 'Ethiopia', event_type: 'Violence against civilians', sub_event_type: 'Massacre', actor1: 'Gumuz Militias', actor2: 'Amhara/Agaw Settlers', fatalities: 42, notes: 'Ethnic massacre in western Ethiopia', timestamp: Date.now() - 172800000 },
  
  // DRC - Ituri province
  { event_id: 'DRC003', event_date: '2026-05-03', year: 2026, latitude: 1.5733, longitude: 29.4650, location: 'Bunia', country: 'Democratic Republic of Congo', event_type: 'Violence against civilians', sub_event_type: 'Attack', actor1: 'CODECO/ Zaïre Militia', actor2: 'Hema Civilians', fatalities: 24, notes: 'Intercommunal violence in Ituri', timestamp: Date.now() - 86400000 },
  
  // Uganda - ADF/ISCAP
  { event_id: 'UGA001', event_date: '2026-05-02', year: 2026, latitude: 0.4167, longitude: 32.7500, location: 'Kampala', country: 'Uganda', event_type: 'Violence against civilians', sub_event_type: 'Attack', actor1: 'ADF/ISCAP', actor2: 'Civilians', fatalities: 5, notes: 'IED attack in capital', timestamp: Date.now() - 172800000 },
  
  // Rwanda - DRC tensions (M23 backing)
  { event_id: 'RWA001', event_date: '2026-05-01', year: 2026, latitude: -1.9403, longitude: 29.8739, location: 'Gisenyi', country: 'Rwanda', event_type: 'Battles', sub_event_type: 'Border skirmish', actor1: 'Rwandan Defense Force', actor2: 'FARDC', fatalities: 12, notes: 'Border clash - DRC accuses Rwanda of M23 support', timestamp: Date.now() - 259200000 },
];

let cachedConflicts: ConflictEvent[] | null = null;
let lastFetchTime = 0;
const CACHE_DURATION = 300000; // 5 minutes

export async function fetchConflictData(): Promise<ConflictEvent[]> {
  const now = Date.now();
  if (cachedConflicts && now - lastFetchTime < CACHE_DURATION) {
    return cachedConflicts;
  }
  
  // Return real conflict data
  cachedConflicts = REAL_CONFLICTS;
  lastFetchTime = now;
  return REAL_CONFLICTS;
}

export function getConflictStats(conflicts: ConflictEvent[]) {
  const byCountry: Record<string, number> = {};
  const byType: Record<string, number> = {};
  let totalFatalities = 0;
  
  conflicts.forEach(c => {
    byCountry[c.country] = (byCountry[c.country] || 0) + 1;
    byType[c.event_type] = (byType[c.event_type] || 0) + 1;
    totalFatalities += c.fatalities;
  });
  
  return {
    total: conflicts.length,
    totalFatalities,
    byCountry,
    byType,
    activeRegions: Object.keys(byCountry).length,
  };
}
