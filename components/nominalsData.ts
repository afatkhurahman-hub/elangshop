export interface NominalItem {
  id: string;
  name: string;
  price: string;
  bonus?: string;
  isBestSeller?: boolean;
}

export const nominalsByProduct: Record<string, NominalItem[]> = {
  // === GAME CATEGORY ===
  "mobile legends": [
    { id: "ml1", name: "5 Diamonds", price: "Rp 4.610" },
    { id: "ml2", name: "12 Diamonds", price: "Rp 6.813" },
    { id: "ml3", name: "19 Diamonds", price: "Rp 8.681" },
    { id: "ml4", name: "28 Diamonds", price: "Rp 11.542" },
    { id: "ml5", name: "44 Diamonds", price: "Rp 15.314" },
    { id: "ml6", name: "59 Diamonds", price: "Rp 19.085" },
    { id: "ml7", name: "70 Diamonds", price: "Rp 22.598", isBestSeller: true },
    { id: "ml8", name: "85 Diamonds", price: "Rp 25.000" },
    { id: "ml9", name: "140 Diamonds", price: "Rp 41.602" },
    { id: "ml10", name: "170 Diamonds", price: "Rp 48.851" },
    { id: "ml11", name: "240 Diamonds", price: "Rp 67.330" },
    { id: "ml12", name: "284 Diamonds", price: "Rp 78.464" },
    { id: "ml13", name: "296 Diamonds", price: "Rp 81.513" },
    { id: "ml14", name: "355 Diamonds", price: "Rp 96.798" },
    { id: "ml15", name: "408 Diamonds", price: "Rp 109.479" },
    { id: "ml16", name: "429 Diamonds", price: "Rp 117.682" },
    { id: "ml17", name: "568 Diamonds", price: "Rp 149.121" },
    { id: "ml18", name: "716 Diamonds", price: "Rp 187.291" },
    { id: "ml19", name: "875 Diamonds", price: "Rp 229.299" },
    { id: "ml20", name: "1050 Diamonds", price: "Rp 280.505" },
    { id: "ml21", name: "1446 Diamonds", price: "Rp 386.829" },
    { id: "ml22", name: "2010 Diamonds", price: "Rp 492.725" },
    { id: "ml23", name: "2976 Diamonds", price: "Rp 740.574" },
    { id: "ml24", name: "4830 Diamonds", price: "Rp 1.185.980" },
    { id: "ml25", name: "7502 Diamonds", price: "Rp 1.902.788" },
    { id: "ml26", name: "Twilight Pass", price: "Rp 146.721" },
    { id: "ml27", name: "Weekly Pass x 1", price: "Rp 31.000", isBestSeller: true }
  ],
  "free fire": [
    { id: "ff1", name: "5 Diamonds", price: "Rp 1.850" },
    { id: "ff2", name: "10 Diamonds", price: "Rp 2.700" },
    { id: "ff3", name: "20 Diamonds", price: "Rp 4.399" },
    { id: "ff4", name: "50 Diamonds", price: "Rp 7.799" },
    { id: "ff5", name: "70 Diamonds", price: "Rp 10.348", isBestSeller: true },
    { id: "ff6", name: "100 Diamonds", price: "Rp 14.597" },
    { id: "ff7", name: "140 Diamonds", price: "Rp 19.696" },
    { id: "ff8", name: "150 Diamonds", price: "Rp 21.396" },
    { id: "ff9", name: "210 Diamonds", price: "Rp 29.044" },
    { id: "ff10", name: "280 Diamonds", price: "Rp 38.393" },
    { id: "ff11", name: "355 Diamonds", price: "Rp 47.741" },
    { id: "ff12", name: "425 Diamonds", price: "Rp 56.089" },
    { id: "ff13", name: "495 Diamonds", price: "Rp 66.437" },
    { id: "ff14", name: "500 Diamonds", price: "Rp 67.287" },
    { id: "ff15", name: "720 Diamonds", price: "Rp 94.481" },
    { id: "ff16", name: "790 Diamonds", price: "Rp 103.829" },
    { id: "ff17", name: "860 Diamonds", price: "Rp 113.178" },
    { id: "ff18", name: "1000 Diamonds", price: "Rp 131.874" },
    { id: "ff19", name: "1075 Diamonds", price: "Rp 141.222" },
    { id: "ff20", name: "1440 Diamonds", price: "Rp 187.963" },
    { id: "ff21", name: "1450 Diamonds", price: "Rp 189.662" },
    { id: "ff22", name: "1500 Diamonds", price: "Rp 196.461" },
    { id: "ff23", name: "2160 Diamonds", price: "Rp 281.444" },
    { id: "ff24", name: "3600 Diamonds", price: "Rp 468.407" },
    { id: "ff25", name: "5040 Diamonds", price: "Rp 655.369" },
    { id: "ff26", name: "7290 Diamonds", price: "Rp 935.813" },
    { id: "ff27", name: "10170 Diamonds", price: "Rp 1.309.739" },
    { id: "ff28", name: "14580 Diamonds", price: "Rp 1.870.627" },
    { id: "ff29", name: "15300 Diamonds", price: "Rp 1.964.108" },
    { id: "ff30", name: "21870 Diamonds", price: "Rp 2.805.440" },
    { id: "ff31", name: "36500 Diamonds", price: "Rp 4.675.066" },
    { id: "ff32", name: "51080 Diamonds", price: "Rp 6.544.693" },
    { id: "ff33", name: "73100 Diamonds", price: "Rp 9.349.133" },
    { id: "ff34", name: "BP Card", price: "Rp 43.492" },
    { id: "ff35", name: "Level Up Pass", price: "Rp 15.164" },
    { id: "ff36", name: "Member Bulanan", price: "Rp 85.983" },
    { id: "ff37", name: "Member Mingguan", price: "Rp 29.328", isBestSeller: true }
  ],
  "pubg mobile": [
    { id: "pubg1", name: "30 Unknown Cash", price: "Rp 11.000" },
    { id: "pubg2", name: "60 Unknown Cash", price: "Rp 19.000" },
    { id: "pubg3", name: "325 Unknown Cash", price: "Rp 75.000", isBestSeller: true },
    { id: "pubg4", name: "660 Unknown Cash", price: "Rp 145.000" },
    { id: "pubg5", name: "1800 Unknown Cash", price: "Rp 355.000" },
    { id: "pubg6", name: "3850 Unknown Cash", price: "Rp 703.000" },
    { id: "pubg7", name: "8100 Unknown Cash", price: "Rp 1.433.000" }
  ],
  "call of duty": [
    { id: "cod1", name: "63 CP", price: "Rp 9.240" },
    { id: "cod2", name: "128 CP", price: "Rp 18.480", isBestSeller: true },
    { id: "cod3", name: "321 CP", price: "Rp 46.200" },
    { id: "cod4", name: "645 CP", price: "Rp 92.400" },
    { id: "cod5", name: "1373 CP", price: "Rp 184.800" },
    { id: "cod6", name: "2060 CP", price: "Rp 277.200" },
    { id: "cod7", name: "3564 CP", price: "Rp 462.000" },
    { id: "cod8", name: "7656 CP", price: "Rp 924.000" }
  ],
  "valorant": [
    { id: "val1", name: "125 Points", price: "Rp 15.000" },
    { id: "val2", name: "300 Points", price: "Rp 33.500" },
    { id: "val3", name: "475 Points", price: "Rp 50.000" },
    { id: "val4", name: "625 Points", price: "Rp 67.000" },
    { id: "val5", name: "1000 Points", price: "Rp 103.000", isBestSeller: true },
    { id: "val6", name: "1125 Points", price: "Rp 117.000" },
    { id: "val7", name: "1425 Points", price: "Rp 147.000" },
    { id: "val8", name: "1650 Points", price: "Rp 169.500" },
    { id: "val9", name: "2100 Points", price: "Rp 206.000" },
    { id: "val10", name: "3400 Points", price: "Rp 330.000" },
    { id: "val11", name: "4000 Points", price: "Rp 392.000" },
    { id: "val12", name: "5500 Points", price: "Rp 525.000" },
    { id: "val13", name: "7000 Points", price: "Rp 658.000" },
    { id: "val14", name: "10500 Points", price: "Rp 980.000" }
  ],
  "aov": [
    { id: "aov1", name: "40 Voucher", price: "Rp 12.207" },
    { id: "aov2", name: "90 Voucher", price: "Rp 21.414" },
    { id: "aov3", name: "230 Voucher", price: "Rp 49.035", isBestSeller: true },
    { id: "aov4", name: "470 Voucher", price: "Rp 95.070" },
    { id: "aov5", name: "950 Voucher", price: "Rp 187.140" },
    { id: "aov6", name: "1430 Voucher", price: "Rp 279.210" },
    { id: "aov7", name: "2390 Voucher", price: "Rp 463.350" },
    { id: "aov8", name: "4800 Voucher", price: "Rp 923.700" }
  ],
  "genshin impact": [
    { id: "gi1", name: "60 Crystals", price: "Rp 15.500" },
    { id: "gi2", name: "330 Crystals", price: "Rp 61.500" },
    { id: "gi3", name: "10900 Crystals", price: "Rp 178.100" },
    { id: "gi4", name: "1340 Crystals", price: "Rp 381.600" },
    { id: "gi5", name: "3880 Crystals", price: "Rp 584.000" },
    { id: "gi6", name: "9080 Crystals", price: "Rp 1.133.000" },
    { id: "gi7", name: "Blessing", price: "Rp 60.500", isBestSeller: true }
  ],

  // === PULSA CATEGORY ===
  "telkomsel": [
    { id: "tsel1", name: "Pulsa 5 Ribu", price: "Rp 6.500" },
    { id: "tsel2", name: "Pulsa 10 Ribu", price: "Rp 11.400" },
    { id: "tsel3", name: "Pulsa 15 Ribu", price: "Rp 16.200" },
    { id: "tsel4", name: "Pulsa 20 Ribu", price: "Rp 21.200" },
    { id: "tsel5", name: "Pulsa 25 Ribu", price: "Rp 26.100" },
    { id: "tsel6", name: "Pulsa 30 Ribu", price: "Rp 31.100" },
    { id: "tsel7", name: "Pulsa 50 Ribu", price: "Rp 50.800", isBestSeller: true },
    { id: "tsel8", name: "Pulsa 100 Ribu", price: "Rp 99.500" }
  ],
  "indosat": [
    { id: "isat1", name: "Pulsa 5 Ribu", price: "Rp 6.300" },
    { id: "isat2", name: "Pulsa 10 Ribu", price: "Rp 11.200" },
    { id: "isat3", name: "Pulsa 15 Ribu", price: "Rp 16.100" },
    { id: "isat4", name: "Pulsa 20 Ribu", price: "Rp 20.900" },
    { id: "isat5", name: "Pulsa 25 Ribu", price: "Rp 25.800" },
    { id: "isat6", name: "Pulsa 30 Ribu", price: "Rp 30.800" },
    { id: "isat7", name: "Pulsa 50 Ribu", price: "Rp 50.500", isBestSeller: true },
    { id: "isat8", name: "Pulsa 100 Ribu", price: "Rp 98.900" }
  ],
  "xl axiata": [
    { id: "xl1", name: "Pulsa 5 Ribu", price: "Rp 6.400" },
    { id: "xl2", name: "Pulsa 10 Ribu", price: "Rp 11.300" },
    { id: "xl3", name: "Pulsa 15 Ribu", price: "Rp 16.200" },
    { id: "xl4", name: "Pulsa 20 Ribu", price: "Rp 21.100" },
    { id: "xl5", name: "Pulsa 25 Ribu", price: "Rp 25.900" },
    { id: "xl6", name: "Pulsa 30 Ribu", price: "Rp 30.900" },
    { id: "xl7", name: "Pulsa 50 Ribu", price: "Rp 50.700", isBestSeller: true },
    { id: "xl8", name: "Pulsa 100 Ribu", price: "Rp 99.200" }
  ],
  "axis": [
    { id: "ax1", name: "Pulsa 5 Ribu", price: "Rp 6.200" },
    { id: "ax2", name: "Pulsa 10 Ribu", price: "Rp 11.100" },
    { id: "ax3", name: "Pulsa 15 Ribu", price: "Rp 16.000" },
    { id: "ax4", name: "Pulsa 20 Ribu", price: "Rp 21.000" },
    { id: "ax5", name: "Pulsa 25 Ribu", price: "Rp 25.700" },
    { id: "ax6", name: "Pulsa 30 Ribu", price: "Rp 30.700" },
    { id: "ax7", name: "Pulsa 50 Ribu", price: "Rp 50.400", isBestSeller: true },
    { id: "ax8", name: "Pulsa 100 Ribu", price: "Rp 98.800" }
  ],
  "smartfren": [
    { id: "sf1", name: "Pulsa 5 Ribu", price: "Rp 5.900" },
    { id: "sf2", name: "Pulsa 10 Ribu", price: "Rp 10.900" },
    { id: "sf3", name: "Pulsa 15 Ribu", price: "Rp 15.800" },
    { id: "sf4", name: "Pulsa 20 Ribu", price: "Rp 20.800" },
    { id: "sf5", name: "Pulsa 25 Ribu", price: "Rp 25.600" },
    { id: "sf6", name: "Pulsa 30 Ribu", price: "Rp 30.500" },
    { id: "sf7", name: "Pulsa 49.900", price: "Rp 49.900", isBestSeller: true },
    { id: "sf8", name: "Pulsa 100 Ribu", price: "Rp 98.500" }
  ],
  "tri": [
    { id: "tri1", name: "Pulsa 5 Ribu", price: "Rp 6.200" },
    { id: "tri2", name: "Pulsa 10 Ribu", price: "Rp 11.100" },
    { id: "tri3", name: "Pulsa 15 Ribu", price: "Rp 16.000" },
    { id: "tri4", name: "Pulsa 20 Ribu", price: "Rp 20.900" },
    { id: "tri5", name: "Pulsa 25 Ribu", price: "Rp 25.700" },
    { id: "tri6", name: "Pulsa 30 Ribu", price: "Rp 30.600" },
    { id: "tri7", name: "Pulsa 50 Ribu", price: "Rp 50.200", isBestSeller: true },
    { id: "tri8", name: "Pulsa 100 Ribu", price: "Rp 98.700" }
  ],
  "by.u": [
    { id: "byu1", name: "Pulsa 5 Ribu", price: "Rp 6.500" },
    { id: "byu2", name: "Pulsa 10 Ribu", price: "Rp 11.400" },
    { id: "byu3", name: "Pulsa 15 Ribu", price: "Rp 16.200" },
    { id: "byu4", name: "Pulsa 20 Ribu", price: "Rp 21.200" },
    { id: "byu5", name: "Pulsa 25 Ribu", price: "Rp 26.100" },
    { id: "byu6", name: "Pulsa 30 Ribu", price: "Rp 31.100" },
    { id: "byu7", name: "Pulsa 50 Ribu", price: "Rp 50.800", isBestSeller: true },
    { id: "byu8", name: "Pulsa 100 Ribu", price: "Rp 99.500" }
  ],

  // === PAKET DATA CATEGORY ===
  "telkomsel data": [
    { id: "tdata1", name: "Internet 1GB / 2 Hari (Flash)", price: "Rp 7.500" },
    { id: "tdata2", name: "Internet 2GB / 3 Hari (Flash)", price: "Rp 15.000" },
    { id: "tdata3", name: "Internet 5GB / 7 Hari (Flash)", price: "Rp 32.000", isBestSeller: true },
    { id: "tdata4", name: "Internet 10GB / 30 Hari (OMG!)", price: "Rp 65.000" },
    { id: "tdata5", name: "Internet 14GB / 30 Hari (OMG!)", price: "Rp 88.000" },
    { id: "tdata6", name: "Internet 27GB / 30 Hari (OMG!)", price: "Rp 142.000" },
    { id: "tdata7", name: "Internet 52GB / 30 Hari (OMG!)", price: "Rp 185.000" }
  ],
  "indosat data": [
    { id: "idata1", name: "Freedom Internet 2GB / 15 Hari", price: "Rp 16.500" },
    { id: "idata2", name: "Freedom Internet 3GB / 30 Hari", price: "Rp 22.000" },
    { id: "idata3", name: "Freedom Internet 5GB / 30 Hari", price: "Rp 31.000" },
    { id: "idata4", name: "Freedom Internet 10GB / 30 Hari", price: "Rp 45.000", isBestSeller: true },
    { id: "idata5", name: "Freedom Internet 18GB / 30 Hari", price: "Rp 67.000" },
    { id: "idata6", name: "Freedom Internet 32GB / 30 Hari", price: "Rp 93.000" },
    { id: "idata7", name: "Freedom U 7GB + 20GB Apps / 30 Hari", price: "Rp 76.000" }
  ],
  "xl data": [
    { id: "xldata1", name: "Xtra Combo Mini 2.5GB / 7 Hari", price: "Rp 11.500" },
    { id: "xldata2", name: "Xtra Combo Mini 4GB / 7 Hari", price: "Rp 16.000" },
    { id: "xldata3", name: "Xtra Combo Flex S 5GB / 30 Hari", price: "Rp 29.000" },
    { id: "xldata4", name: "Xtra Combo Flex M 10GB / 30 Hari", price: "Rp 49.000", isBestSeller: true },
    { id: "xldata5", name: "Xtra Combo Flex L 20GB / 30 Hari", price: "Rp 79.000" },
    { id: "xldata6", name: "Xtra Combo Flex XL 38GB / 30 Hari", price: "Rp 119.000" },
    { id: "xldata7", name: "Xtra Combo Flex XXL 62GB / 30 Hari", price: "Rp 159.000" }
  ],
  "axis data": [
    { id: "axdata1", name: "Bronet 1GB / 3 Hari", price: "Rp 6.500" },
    { id: "axdata2", name: "Bronet 2GB / 7 Hari", price: "Rp 12.000" },
    { id: "axdata3", name: "Bronet 3GB / 30 Hari", price: "Rp 21.500" },
    { id: "axdata4", name: "Bronet 5GB / 30 Hari", price: "Rp 32.000", isBestSeller: true },
    { id: "axdata5", name: "Bronet 10GB / 30 Hari", price: "Rp 54.000" },
    { id: "axdata6", name: "OWSEM 16GB (2GB Utama + 14GB Sosmed/Malam)", price: "Rp 43.000" },
    { id: "axdata7", name: "OWSEM 24GB (3GB Utama + 21GB Sosmed/Malam)", price: "Rp 56.000" }
  ],
  "smartfren data": [
    { id: "sfdata1", name: "1GB / Hari Volumetrik - 7 Hari", price: "Rp 21.000" },
    { id: "sfdata2", name: "1GB / Hari Volumetrik - 14 Hari", price: "Rp 38.000" },
    { id: "sfdata3", name: "Unlimited Harian 1GB/Hari - 28 Hari", price: "Rp 65.000", isBestSeller: true },
    { id: "sfdata4", name: "Unlimited Nonstop 6GB / 30 Hari", price: "Rp 32.000" },
    { id: "sfdata5", name: "Unlimited Nonstop 12GB / 30 Hari", price: "Rp 48.000" },
    { id: "sfdata6", name: "Unlimited Nonstop 30GB / 30 Hari", price: "Rp 73.000" }
  ],
  "tri data": [
    { id: "tridata1", name: "Happy 1GB / 1 Hari", price: "Rp 4.000" },
    { id: "tridata2", name: "Happy 2GB / 3 Hari", price: "Rp 8.500" },
    { id: "tridata3", name: "Happy 5GB / 7 Hari", price: "Rp 17.500" },
    { id: "tridata4", name: "Happy 12GB / 30 Hari", price: "Rp 43.000" },
    { id: "tridata5", name: "Happy 18GB / 30 Hari", price: "Rp 55.000", isBestSeller: true },
    { id: "tridata6", name: "Happy 30GB / 30 Hari", price: "Rp 82.000" },
    { id: "tridata7", name: "AlwaysOn (AON) 6GB (Masa Aktif Selamanya)", price: "Rp 31.000" },
    { id: "tridata8", name: "AlwaysOn (AON) 12GB (Masa Aktif Selamanya)", price: "Rp 53.000" }
  ],
  "by.u data": [
    { id: "byudata1", name: "Yang Bikin Nagih 1GB / 1 Hari", price: "Rp 5.000" },
    { id: "byudata2", name: "Yang Bikin Deket 10GB / 1 Hari", price: "Rp 13.000" },
    { id: "byudata3", name: "Yang Dicap Jempol 12GB / 7 Hari", price: "Rp 31.000" },
    { id: "byudata4", name: "Yang Bikin Nagih 3GB / 14 Hari", price: "Rp 19.500" },
    { id: "byudata5", name: "Yang Bikin Samaan 10GB / 30 Hari", price: "Rp 45.000", isBestSeller: true },
    { id: "byudata6", name: "Yang Bikin Kaya Kuota 35GB / 30 Hari", price: "Rp 85.000" },
    { id: "byudata7", name: "Yang Bikin Kalong Nyaman 50GB / 30 Hari (Malam)", price: "Rp 40.000" }
  ],

  // === E-WALLET CATEGORY ===
  "dana": [
    { id: "dana1", name: "Top Up 10.000", price: "Rp 11.500" },
    { id: "dana2", name: "Top Up 20.000", price: "Rp 21.500", isBestSeller: true },
    { id: "dana3", name: "Top Up 25.000", price: "Rp 26.500" },
    { id: "dana4", name: "Top Up 50.000", price: "Rp 51.500" },
    { id: "dana5", name: "Top Up 100.000", price: "Rp 101.500" }
  ],
  "ovo": [
    { id: "ovo1", name: "Top Up 10.000", price: "Rp 11.500" },
    { id: "ovo2", name: "Top Up 20.000", price: "Rp 21.500", isBestSeller: true },
    { id: "ovo3", name: "Top Up 25.000", price: "Rp 26.500" },
    { id: "ovo4", name: "Top Up 50.000", price: "Rp 51.500" },
    { id: "ovo5", name: "Top Up 100.000", price: "Rp 101.500" }
  ],
  "gopay": [
    { id: "gpay1", name: "Top Up 10.000", price: "Rp 11.200" },
    { id: "gpay2", name: "Top Up 20.000", price: "Rp 21.200", isBestSeller: true },
    { id: "gpay3", name: "Top Up 25.000", price: "Rp 26.200" },
    { id: "gpay4", name: "Top Up 50.000", price: "Rp 51.200" },
    { id: "gpay5", name: "Top Up 100.000", price: "Rp 101.200" }
  ],
  "shopeepay": [
    { id: "spay1", name: "Top Up 10.000", price: "Rp 11.300" },
    { id: "spay2", name: "Top Up 20.000", price: "Rp 21.300", isBestSeller: true },
    { id: "spay3", name: "Top Up 25.000", price: "Rp 26.300" },
    { id: "spay4", name: "Top Up 50.000", price: "Rp 51.300" },
    { id: "spay5", name: "Top Up 100.000", price: "Rp 101.300" }
  ],

  // === PREMIUM APPS CATEGORY ===
  "netflix": [
    { id: "net1", name: "Sharing 1P1U - 3 Hari", price: "Rp 15.000" },
    { id: "net2", name: "Sharing 1P1U - 1 Minggu", price: "Rp 21.000" },
    { id: "net3", name: "Sharing 1P1U - 1 Bulan", price: "Rp 50.000", isBestSeller: true },
    { id: "net4", name: "Sharing 2P1U - 1 Bulan", price: "Rp 35.000" },
    { id: "net5", name: "Sharing 2P1U - 3 Bulan", price: "Rp 85.000" },
    { id: "net6", name: "Semi Private - 1 Bulan", price: "Rp 60.000" },
    { id: "net7", name: "Private - 1 Bulan", price: "Rp 170.000" }
  ],
  "youtube": [
    { id: "yt1", name: "Famplan - 1 Bulan", price: "Rp 10.000" },
    { id: "yt2", name: "Famplan - 2 Bulan", price: "Rp 18.000" },
    { id: "yt3", name: "Indplan - 1 Bulan", price: "Rp 15.000", isBestSeller: true },
    { id: "yt4", name: "Indplan - 2 Bulan", price: "Rp 30.000" },
    { id: "yt5", name: "Mixplan - 3 Bulan", price: "Rp 40.000" },
    { id: "yt6", name: "Mixplan - 5 Bulan", price: "Rp 60.000" }
  ],
  "spotify": [
    { id: "spot1", name: "Indplan - 1 Bulan", price: "Rp 25.000", isBestSeller: true },
    { id: "spot2", name: "Famplan - 1 Bulan (No Grs)", price: "Rp 20.000" },
    { id: "spot3", name: "Famplan - 2 Bulan (No Grs)", price: "Rp 45.000" },
    { id: "spot4", name: "Famplan - 3 Bulan (No Grs)", price: "Rp 55.000" },
    { id: "spot5", name: "Famhead - 1 Bulan (No Grs)", price: "Rp 24.000" }
  ],
  "vidio": [
    { id: "vid1", name: "All Device - 1 Bulan Sharing", price: "Rp 35.000" },
    { id: "vid2", name: "All Device - 1 Bulan Private", price: "Rp 55.000", isBestSeller: true },
    { id: "vid3", name: "Mobile Only - 1 Bulan Sharing", price: "Rp 35.000" },
    { id: "vid4", name: "Mobile Only - 1 Bulan Private", price: "Rp 40.000" },
    { id: "vid5", name: "TV Only - 1 Bulan Sharing", price: "Rp 30.000" },
    { id: "vid6", name: "TV Only - 3 Bulan Sharing", price: "Rp 80.000" },
    { id: "vid7", name: "TV Only - 1 Tahun Sharing", price: "Rp 80.000" }
  ],
  "vidio premier": [
    { id: "vprem1", name: "1 Bulan", price: "Rp 70.000", isBestSeller: true },
    { id: "vprem2", name: "2 Bulan", price: "Rp 90.000" }
  ],
  "we tv": [
    { id: "wtv1", name: "Sharing - 1 Bulan", price: "Rp 17.000", isBestSeller: true },
    { id: "wtv2", name: "Sharing - 3 Bulan", price: "Rp 27.000" },
    { id: "wtv3", name: "Sharing - 1 Tahun", price: "Rp 47.000" },
    { id: "wtv4", name: "Private - 1 Bulan", price: "Rp 45.000" }
  ],
  "viu": [
    { id: "viu1", name: "Private - 1 Bulan", price: "Rp 10.000" },
    { id: "viu2", name: "Private - 3 Bulan", price: "Rp 20.000" },
    { id: "viu3", name: "Private - 6 Bulan", price: "Rp 35.000" },
    { id: "viu4", name: "Private - 1 Tahun", price: "Rp 45.000", isBestSeller: true }
  ],
  "prime video": [
    { id: "pvid1", name: "Sharing - 1 Bulan", price: "Rp 15.000" },
    { id: "pvid2", name: "Private - 1 Bulan", price: "Rp 25.000", isBestSeller: true }
  ],
  "disney+": [
    { id: "dis1", name: "Sharing 4u - 1 Bulan", price: "Rp 40.000" },
    { id: "dis2", name: "Sharing 3u - 1 Bulan", price: "Rp 45.000" },
    { id: "dis3", name: "Sharing 2u - 1 Bulan", price: "Rp 50.000", isBestSeller: true },
    { id: "dis4", name: "Private - 1 Bulan", price: "Rp 105.000" }
  ],
  "bstation": [
    { id: "bst1", name: "Sharing - 1 Bulan", price: "Rp 20.000" },
    { id: "bst2", name: "Sharing - 3 Bulan", price: "Rp 30.000" },
    { id: "bst3", name: "Sharing - 1 Tahun", price: "Rp 50.000", isBestSeller: true },
    { id: "bst4", name: "Private - 1 Bulan", price: "Rp 50.000" },
    { id: "bst5", name: "Private - 3 Bulan", price: "Rp 100.000" }
  ],
  "canva": [
    { id: "can1", name: "Invite Team - 1 Bulan", price: "Rp 7.000" },
    { id: "can2", name: "Invite Team - 2 Bulan", price: "Rp 10.000" },
    { id: "can3", name: "Invite Team - 3 Bulan", price: "Rp 15.000" },
    { id: "can4", name: "Invite Team - 6 Bulan", price: "Rp 20.000" },
    { id: "can5", name: "Invite Team - 1 Tahun", price: "Rp 35.000", isBestSeller: true },
    { id: "can6", name: "Lifetime", price: "Rp 50.000" },
    { id: "can7", name: "Designer", price: "Rp 5.000" }
  ],
  "capcut pro": [
    { id: "cc1", name: "Sharing - 7 Hari", price: "Rp 15.000" },
    { id: "cc2", name: "Sharing - 1 Bulan", price: "Rp 30.000" },
    { id: "cc3", name: "Private - 7 Hari", price: "Rp 20.000" },
    { id: "cc4", name: "Private - 21 Hari", price: "Rp 45.000" },
    { id: "cc5", name: "Private - 1 Bulan", price: "Rp 70.000", isBestSeller: true },
    { id: "cc6", name: "Private - 1 Tahun", price: "Rp 200.000" }
  ],
  "picsart gold": [
    { id: "pa1", name: "Sharing - 1 Bulan", price: "Rp 15.000" },
    { id: "pa2", name: "Private - 1 Bulan", price: "Rp 22.000", isBestSeller: true }
  ],
  "alight motion": [
    { id: "am1", name: "Sharing - 1 Bulan", price: "Rp 15.000" },
    { id: "am2", name: "Sharing - 6 Bulan", price: "Rp 30.000" },
    { id: "am3", name: "Sharing - 1 Tahun", price: "Rp 40.000", isBestSeller: true }
  ],

  // === PLN CATEGORY ===
  "pln token": [
    { id: "pln1", name: "Token 20.000", price: "Rp 21.500" },
    { id: "pln2", name: "Token 50.000", price: "Rp 51.500", isBestSeller: true },
    { id: "pln3", name: "Token 100.000", price: "Rp 101.500" },
    { id: "pln4", name: "Token 200.000", price: "Rp 201.500" },
    { id: "pln5", name: "Token 500.000", price: "Rp 501.500" },
    { id: "pln6", name: "Token 1.000.000", price: "Rp 1.001.500" }
  ],
  "pln pascabayar": [
    { id: "pln7", name: "Cek & Bayar Tagihan", price: "Rp 3.500 (Admin)", isBestSeller: true }
  ],

  // === DEFAULT OVERFLOW FALLBACK ===
  "default": [
    { id: "df1", name: "Layanan Reguler 1", price: "Rp 5.000" },
    { id: "df2", name: "Layanan Reguler 2", price: "Rp 10.000" }
  ]
};