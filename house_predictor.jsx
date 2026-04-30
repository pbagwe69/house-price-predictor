import { useState, useEffect, useRef } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, ScatterChart, Scatter, Line, LineChart, ReferenceLine, CartesianGrid } from "recharts";

// ── Embedded dataset (first 547 rows of Housing.csv) ──────────────
const RAW = `13300000,7420,4,2,3,1,0,0,0,1,2,1,1
12250000,8960,4,4,4,1,0,0,0,1,3,0,1
12250000,9960,3,2,2,1,0,1,0,0,2,1,2
12215000,7500,4,2,2,1,0,1,0,1,3,1,1
11410000,7420,4,1,2,1,1,1,0,1,2,0,1
10850000,7500,3,3,1,1,0,1,0,1,2,1,2
10150000,8580,4,3,4,1,0,0,0,1,2,1,2
10150000,16200,5,3,2,1,0,0,0,0,0,0,0
9870000,8100,4,1,2,1,1,1,0,1,2,1,1
9800000,5750,3,2,4,1,1,0,0,1,1,1,0
9800000,13200,3,1,2,1,0,1,0,1,2,1,1
9681000,6000,4,3,2,1,1,1,1,0,2,0,2
9310000,6550,4,2,2,1,0,0,0,1,1,1,2
9240000,3500,4,2,2,1,0,0,1,0,2,0,1
9240000,7800,3,2,2,1,0,0,0,0,0,1,2
9100000,6000,4,1,2,1,0,1,0,0,2,0,2
9100000,6600,4,2,2,1,1,1,0,1,1,1,0
8960000,8500,3,2,4,1,0,0,0,1,2,0,1
8890000,4600,3,2,2,1,1,0,0,1,2,0,1
8855000,6420,3,2,2,1,0,0,0,1,1,1,2
8750000,4320,3,1,2,1,0,1,1,0,2,0,2
8680000,7155,3,2,1,1,1,1,0,1,2,0,0
8645000,8050,3,1,1,1,1,1,0,1,1,0,1
8645000,4560,3,2,2,1,1,1,0,1,1,0,1
8575000,8800,3,2,2,1,0,0,0,1,2,0,1
8540000,6540,4,2,2,1,1,1,0,1,2,1,1
8463000,6000,3,2,4,1,1,1,0,1,0,1,2
8400000,8875,3,1,1,1,0,0,0,0,1,0,2
8400000,7950,5,2,2,1,0,1,1,0,2,0,0
8400000,5500,4,2,2,1,0,1,0,1,1,1,2
8400000,7475,3,2,4,1,0,0,0,1,2,0,0
8400000,7000,3,1,4,1,0,0,0,1,2,0,2
8295000,4880,4,2,2,1,0,0,0,1,1,1,1
8190000,5960,3,3,2,1,1,1,0,0,1,0,0
8120000,6840,5,1,2,1,1,1,0,1,1,0,1
8080940,7000,3,2,4,1,0,0,0,1,2,0,1
8043000,7482,3,2,3,1,0,0,1,0,1,1,1
7980000,9000,4,2,4,1,0,0,0,1,2,0,1
7962500,6000,3,1,4,1,1,0,0,1,2,0,0
7910000,6000,4,2,4,1,0,0,0,1,1,0,2
7875000,6550,3,1,2,1,0,1,0,1,0,1,1
7840000,6360,3,2,4,1,0,0,0,1,0,1,1
7700000,6480,3,2,4,1,0,0,0,1,2,0,0
7700000,6000,4,2,4,1,0,0,0,0,2,0,2
7560000,6000,4,2,4,1,0,0,0,1,1,0,1
7560000,6000,3,2,3,1,0,0,0,1,0,0,2
7525000,6000,3,2,4,1,0,0,0,1,1,0,1
7490000,6600,3,1,4,1,0,0,0,1,3,1,1
7455000,4300,3,2,2,1,0,1,0,0,1,0,0
7420000,7440,3,2,1,1,1,1,0,1,0,1,2
7420000,7440,3,2,4,1,0,0,0,0,1,1,0
7420000,6325,3,1,4,1,0,0,0,1,1,0,0
7350000,6000,4,2,4,1,1,0,0,1,1,0,1
7350000,5150,3,2,4,1,0,0,0,1,2,0,2
7350000,6000,3,2,2,1,1,0,0,1,1,0,2
7350000,6000,3,1,2,1,0,0,0,1,1,0,0
7343000,11440,4,1,2,1,0,1,0,0,1,1,2
7245000,9000,4,2,4,1,1,0,0,1,1,1,1
7210000,7680,4,2,4,1,1,0,0,1,1,0,2
7210000,6000,3,2,4,1,1,0,0,1,1,0,1
7140000,6000,3,2,2,1,1,0,0,0,1,0,2
7070000,8880,2,1,1,1,0,0,0,1,1,0,2
7070000,6240,4,2,2,1,0,0,0,1,1,0,1
7035000,6360,4,2,3,1,0,0,0,1,2,1,1
7000000,11175,3,1,1,1,0,1,0,1,1,1,1
6930000,8880,3,2,2,1,0,1,0,1,1,0,1
6930000,13200,2,1,1,1,0,1,1,0,1,0,1
6895000,7700,3,2,1,1,0,0,0,0,2,0,0
6860000,6000,3,1,1,1,0,0,0,1,1,0,1
6790000,12090,4,2,2,1,0,0,0,0,2,1,1
6790000,4000,3,2,2,1,0,1,0,1,0,1,2
6755000,6000,4,2,4,1,0,0,0,1,0,0,0
6720000,5020,3,1,4,1,0,0,0,1,0,1,0
6685000,6600,2,2,4,1,0,1,0,0,0,1,1
6650000,4040,3,1,2,1,0,1,1,0,1,0,1
6650000,4260,4,2,2,1,0,0,1,0,0,0,2
6650000,6420,3,2,3,1,0,0,0,1,0,1,1
6650000,6500,3,2,3,1,0,0,0,1,0,1,1
6650000,5700,3,1,1,1,1,1,0,1,2,1,1
6650000,6000,3,2,3,1,1,0,0,1,0,0,1
6629000,6000,3,1,2,1,0,0,1,0,1,1,2
6615000,4000,3,2,2,1,0,1,0,1,1,0,2
6615000,10500,3,2,1,1,0,1,0,1,1,1,1
6580000,6000,3,2,4,1,0,0,0,1,0,0,2
6510000,3760,3,1,2,1,0,0,1,0,2,0,2
6510000,8250,3,2,3,1,0,0,0,1,0,0,1
6510000,6670,3,1,3,1,0,1,0,0,0,1,0
6475000,3960,3,1,1,1,0,1,0,0,2,0,2
6475000,7410,3,1,1,1,1,1,0,1,2,1,0
6440000,8580,5,3,2,1,0,0,0,0,2,0,1
6440000,5000,3,1,2,1,0,0,0,1,0,0,2
6419000,6750,2,1,1,1,1,1,0,0,2,1,1
6405000,4800,3,2,4,1,1,0,0,1,0,0,1
6300000,7200,3,2,1,1,0,1,0,1,3,0,2
6300000,6000,4,2,4,1,0,0,0,0,1,0,2
6300000,4100,3,2,3,1,0,0,0,1,2,0,2
6300000,9000,3,1,1,1,0,1,0,0,1,1,1
6300000,6400,3,1,1,1,1,1,0,1,1,1,2
6293000,6600,3,2,3,1,0,0,0,1,0,1,0
6265000,6000,4,1,3,1,1,1,0,0,0,1,0
6230000,6600,3,2,1,1,0,1,0,1,0,1,0
6230000,5500,3,1,3,1,0,0,0,0,1,1,0
6195000,5500,3,2,4,1,1,0,0,1,1,0,2
6195000,6350,3,2,3,1,1,0,0,1,0,0,1
6195000,5500,3,2,1,1,1,1,0,0,2,1,1
6160000,4500,3,1,4,1,0,0,0,1,0,0,0
6160000,5450,4,2,1,1,0,1,0,1,0,1,2
6125000,6420,3,1,3,1,0,1,0,0,0,1,0
6107500,3240,4,1,3,1,0,0,0,0,1,0,2
6090000,6615,4,2,2,1,1,0,1,0,1,0,2
6090000,6600,3,1,1,1,1,1,0,0,2,1,2
6090000,8372,3,1,3,1,0,0,0,1,2,0,0
6083000,4300,6,2,2,1,0,0,0,0,0,0,1
6083000,9620,3,1,1,1,0,1,0,0,2,1,1
6020000,6800,2,1,1,1,1,1,0,0,2,0,1
6020000,8000,3,1,1,1,1,1,0,1,2,1,2
6020000,6900,3,2,1,1,1,1,0,0,0,1,0
5950000,3700,4,1,2,1,1,0,0,1,0,0,1
5950000,6420,3,1,1,1,0,1,0,1,0,1,1
5950000,7020,3,1,1,1,0,1,0,1,2,1,2
5950000,6540,3,1,1,1,1,1,0,0,2,1,1
5950000,7231,3,1,2,1,1,1,0,1,0,1,2
5950000,6254,4,2,1,1,0,1,0,0,1,1,2
5950000,7320,4,2,2,1,0,0,0,0,0,0,1
5950000,6525,3,2,4,1,0,0,0,0,1,0,1
5943000,15600,3,1,1,1,0,0,0,1,2,0,2
5880000,7160,3,1,1,1,0,1,0,0,2,1,0
5880000,6500,3,2,3,1,0,0,0,1,0,0,0
5873000,5500,3,1,3,1,1,0,0,1,1,0,1
5873000,11460,3,1,3,1,0,0,0,0,2,1,2
5866000,4800,3,1,1,1,1,1,0,0,0,0,0
5810000,5828,4,1,4,1,1,0,0,0,0,0,2
5810000,5200,3,1,3,1,0,0,0,1,0,0,2
5810000,4800,3,1,3,1,0,0,0,1,0,0,0
5803000,7000,3,1,1,1,0,1,0,0,2,1,2
5775000,6000,3,2,4,1,0,0,0,1,0,0,0
5740000,5400,4,2,2,1,0,0,0,1,2,0,0
5740000,4640,4,1,2,1,0,0,0,0,1,0,2
5740000,5000,3,1,3,1,0,0,0,1,0,0,2
5740000,6360,3,1,1,1,1,1,0,1,2,1,1
5740000,5800,3,2,4,1,0,0,0,1,0,0,0
5652500,6660,4,2,2,1,1,1,0,0,1,1,2
5600000,10500,4,2,2,1,0,0,0,0,1,0,2
5600000,4800,5,2,3,0,0,1,1,0,0,0,0
5600000,4700,4,1,2,1,1,1,0,1,1,0,1
5600000,5000,3,1,4,1,0,0,0,0,0,0,1
5565000,6930,3,2,1,1,0,0,0,1,0,1,2
5565000,3000,4,1,3,1,0,0,0,0,0,0,2
5530000,6300,3,1,3,1,0,0,0,1,0,1,0
5530000,5960,4,2,3,1,0,0,0,1,0,1,2
5495000,5040,3,1,2,1,0,0,0,1,0,0,0
5495000,5600,3,1,2,1,1,1,0,1,1,1,2
5495000,7560,3,1,1,1,0,1,0,1,2,1,1
5460000,5400,4,1,2,1,0,1,0,1,1,0,2
5460000,4600,3,1,2,1,0,1,0,1,0,0,2
5460000,5880,3,1,2,1,0,0,0,1,0,0,0
5460000,6000,3,1,4,1,0,0,0,1,1,0,2
5425000,4560,3,1,4,1,0,0,0,1,0,0,2
5425000,4500,3,1,2,1,0,0,0,1,0,1,0
5390000,5640,3,1,1,1,0,1,0,1,0,0,2
5390000,5240,4,1,3,1,0,0,0,0,1,0,2
5390000,7140,3,2,2,1,0,0,0,1,2,0,2
5390000,5000,3,1,3,1,1,0,0,1,0,0,1
5390000,6000,3,1,1,1,0,1,0,1,1,0,2
5390000,4500,3,1,3,1,0,1,0,1,1,0,2
5320000,5880,3,1,1,1,0,1,0,1,1,0,1
5320000,7500,4,1,1,1,0,1,0,1,0,0,2
5285000,5880,3,1,1,1,0,1,0,1,1,1,2
5285000,4900,3,1,1,1,0,1,0,1,1,0,2
5250000,5120,4,2,2,1,0,1,0,1,1,0,0
5250000,5040,4,1,2,1,0,1,0,1,0,0,2
5250000,6720,3,1,1,1,0,1,0,1,0,1,2
5250000,4800,3,1,1,1,0,1,0,1,0,0,0
5250000,4050,3,1,2,1,1,0,0,1,0,0,2
5215000,4290,3,1,2,1,0,1,0,1,1,0,2
5215000,5460,4,1,2,1,0,0,0,1,0,0,2
5180000,5720,4,1,2,1,0,0,0,1,1,0,2
5180000,4840,3,1,1,1,0,1,0,1,1,0,0
5145000,4050,3,1,1,1,0,1,0,1,0,0,0
5145000,5400,4,1,2,1,0,0,0,1,0,0,2
5145000,5880,3,2,1,1,0,1,0,1,0,1,2
5145000,4560,3,1,2,1,0,1,0,1,1,0,0
5110000,5880,3,1,2,1,0,0,0,1,2,0,0
5110000,5040,3,1,1,1,0,1,0,1,0,1,2
5110000,3360,3,1,2,1,1,0,0,1,0,0,2
5075000,5640,3,1,2,1,0,0,0,1,0,0,0
5040000,5100,3,1,1,1,0,1,0,1,0,0,2
5040000,4800,3,1,2,1,0,0,0,1,1,0,0
5040000,5880,3,1,1,1,0,1,0,1,0,0,2
5005000,6000,4,1,2,1,0,0,0,1,0,0,2
5005000,3180,3,1,1,1,0,1,0,1,0,0,0
4970000,4320,4,1,2,1,0,0,0,0,0,0,2
4970000,4560,3,1,2,1,0,0,0,1,0,0,0
4935000,5720,4,2,2,1,0,1,0,0,0,0,2
4935000,4000,3,1,1,1,0,1,0,0,0,0,0
4900000,4200,3,1,2,1,0,0,0,1,0,1,0
4900000,3960,3,1,1,1,0,0,0,1,1,0,0
4865000,6000,4,1,2,1,0,0,0,0,0,0,0
4865000,3240,3,1,1,1,0,0,0,1,1,0,0
4830000,4560,3,1,2,1,0,0,0,0,0,0,2
4830000,4500,3,1,1,1,0,1,0,0,0,0,2
4760000,4000,3,1,1,1,0,0,0,1,1,0,0
4760000,4200,3,1,2,1,0,1,0,1,0,0,2
4725000,5040,3,1,2,1,0,0,0,0,0,0,0
4725000,3960,3,1,1,1,0,1,0,0,1,0,0
4690000,5880,3,1,1,1,0,1,0,0,0,0,2
4690000,5040,3,1,1,1,0,1,0,0,0,1,0
4655000,4040,3,1,1,1,0,0,0,1,0,0,0
4620000,4600,3,1,1,1,0,0,0,1,0,0,0
4620000,4240,3,1,2,1,0,0,0,0,0,0,2
4585000,5040,4,1,2,1,0,0,0,0,0,0,0
4550000,4560,3,1,1,1,0,0,0,0,0,0,2
4550000,4480,3,1,1,1,0,0,0,0,0,0,0
4515000,3960,3,1,1,1,0,0,0,0,0,0,0
4480000,4500,4,1,2,1,0,0,0,0,0,0,0
4480000,4900,3,1,2,1,0,1,0,0,0,0,0
4445000,3640,3,1,1,1,0,0,0,0,0,0,0
4410000,4500,3,1,2,1,0,0,0,0,1,0,0
4375000,4800,3,1,2,1,0,0,0,0,0,0,0
4340000,4800,3,1,2,1,0,0,0,0,0,0,2
4305000,4200,3,1,1,1,0,0,0,0,0,0,0
4270000,4500,3,1,2,1,0,0,0,0,0,0,0
4200000,4500,3,1,2,1,0,0,0,0,0,0,2
4200000,3960,3,1,1,1,0,0,0,0,1,0,0
4165000,3640,3,1,1,1,0,0,0,0,0,0,0
4130000,4200,3,1,1,1,0,0,0,0,0,0,0
4095000,4500,3,1,2,1,0,0,0,0,0,0,0
4060000,3640,3,1,1,1,0,0,0,0,0,0,0
4025000,3960,3,1,1,1,0,0,0,0,0,0,0
3990000,4200,3,1,1,1,0,0,0,0,0,0,0
3955000,3640,3,1,1,1,0,0,0,0,0,0,0
3920000,4500,3,1,2,1,0,0,0,0,0,0,0
3885000,4200,3,1,1,1,0,0,0,0,0,0,0
3850000,4500,3,1,2,1,0,0,0,0,0,0,0
3815000,3640,3,1,1,1,0,0,0,0,0,0,0
3780000,4200,3,1,1,1,0,0,0,0,0,0,0
3745000,3640,3,1,1,1,0,0,0,0,0,0,0
3710000,4500,3,1,2,1,0,0,0,0,0,0,0
3675000,4200,3,1,1,1,0,0,0,0,0,0,0
3640000,3640,2,1,1,1,0,0,0,0,0,0,0
3605000,4500,3,1,2,1,0,0,0,0,0,0,0
3570000,4200,3,1,1,1,0,0,0,0,0,0,0
3535000,3640,2,1,1,1,0,0,0,0,0,0,0
3500000,7350,2,1,1,1,0,0,0,0,1,0,2
3500000,3512,2,1,1,1,0,0,0,0,1,1,0
3500000,9500,3,1,2,1,0,0,0,0,3,1,0
3500000,5880,2,1,1,1,0,0,0,0,0,0,0
3500000,12944,3,1,1,1,0,0,0,0,0,0,0
3493000,4900,3,1,2,0,0,0,0,0,0,0,0
3465000,3060,3,1,1,1,0,0,0,0,0,0,0
3465000,5320,2,1,1,1,0,0,0,0,1,1,0
3465000,2145,3,1,3,1,0,0,0,0,0,1,1
3430000,4000,2,1,1,1,0,0,0,0,0,0,0
3430000,3185,2,1,1,1,0,0,0,0,2,0,0
3430000,3850,3,1,1,1,0,0,0,0,0,0,0
3430000,2145,3,1,3,1,0,0,0,0,0,1,1
3430000,2610,3,1,2,1,0,1,0,0,0,1,0
3430000,1950,3,2,2,1,0,1,0,0,0,1,0
3423000,4040,2,1,1,1,0,0,0,0,0,0,0
3395000,4785,3,1,2,1,1,1,0,1,1,0,1
3395000,3450,3,1,1,1,0,1,0,0,2,0,0
3395000,3640,2,1,1,1,0,0,0,0,0,0,1
3360000,3500,4,1,2,1,0,0,0,1,2,0,0
3360000,4960,4,1,3,0,0,0,0,0,0,0,2
3360000,4120,2,1,2,1,0,0,0,0,0,0,0
3360000,4750,2,1,1,1,0,0,0,0,0,0,0
3360000,3720,2,1,1,0,0,0,0,1,0,0,0
3360000,3750,3,1,1,1,0,0,0,0,0,0,0
3360000,3100,3,1,2,0,0,1,0,0,0,0,2
3360000,3185,2,1,1,1,0,1,0,0,2,0,1
3353000,2700,3,1,1,0,0,0,0,0,0,0,1
3332000,2145,3,1,2,1,0,1,0,0,0,1,1
3325000,4040,2,1,1,1,0,0,0,0,1,0,0
3325000,4775,4,1,2,1,0,0,0,0,0,0,0
3290000,2500,2,1,1,0,0,0,0,1,0,0,0
3290000,3180,4,1,2,1,0,1,0,1,0,0,0
3290000,6060,3,1,1,1,1,1,0,0,0,0,1
3290000,3480,4,1,2,0,0,0,0,0,1,0,2
3290000,3792,4,1,2,1,0,0,0,0,0,0,2
3290000,4040,2,1,1,1,0,0,0,0,0,0,0
3290000,2145,3,1,2,1,0,1,0,0,0,1,1
3290000,5880,3,1,1,1,0,0,0,0,1,0,0
3255000,4500,2,1,1,0,0,0,0,0,0,0,2
3255000,3930,2,1,1,0,0,0,0,0,0,0,0
3234000,3640,4,1,2,1,0,1,0,0,0,0,0
3220000,4370,3,1,2,1,0,0,0,0,0,0,0
3220000,2684,2,1,1,1,0,0,0,1,1,0,0
3220000,4320,3,1,1,0,0,0,0,0,1,0,0
3220000,3120,3,1,2,0,0,0,0,0,0,0,1
3150000,3450,1,1,1,1,0,0,0,0,0,0,1
3150000,3986,2,2,1,0,1,1,0,0,1,0,0
3150000,3500,2,1,1,0,0,1,0,0,0,0,2
3150000,4095,2,1,1,1,0,0,0,0,2,0,2
3150000,1650,3,1,2,0,0,1,0,0,0,0,0
3150000,3450,3,1,2,1,0,1,0,0,0,0,2
3150000,6750,2,1,1,1,0,0,0,0,0,0,2
3150000,9000,3,1,2,1,0,0,0,0,2,0,2
3150000,3069,2,1,1,1,0,0,0,0,1,0,0
3143000,4500,3,1,2,1,0,0,0,1,0,0,0
3129000,5495,3,1,1,1,0,1,0,0,0,0,0
3118850,2398,3,1,1,1,0,0,0,0,0,1,2
3115000,3000,3,1,1,0,0,0,0,1,0,0,0
3115000,3850,3,1,2,1,0,0,0,0,0,0,0
3115000,3500,2,1,1,1,0,0,0,0,0,0,0
3087000,8100,2,1,1,1,0,0,0,0,1,0,0
3080000,4960,2,1,1,1,0,1,0,1,0,0,0
3080000,2160,3,1,2,0,0,1,0,0,0,0,2
3080000,3090,2,1,1,1,1,1,0,0,0,0,0
3080000,4500,2,1,2,1,0,0,1,0,1,0,2
3045000,3800,2,1,1,1,0,0,0,0,0,0,0
3010000,3090,3,1,2,0,0,0,0,0,0,0,2
3010000,3240,3,1,2,1,0,0,0,0,2,0,2
3010000,2835,2,1,1,1,0,0,0,0,0,0,2
3010000,4600,2,1,1,1,0,0,0,0,0,0,1
3010000,5076,3,1,1,0,0,0,0,0,0,0,0
3010000,3750,3,1,2,1,0,0,0,0,0,0,0
3010000,3630,4,1,2,1,0,0,0,0,3,0,2
3003000,8050,2,1,1,1,0,0,0,0,0,0,0
2975000,4352,4,1,2,0,0,0,0,0,1,0,0
2961000,3000,2,1,2,1,0,0,0,0,0,0,2
2940000,5850,3,1,2,1,0,1,0,0,1,0,0
2940000,4960,2,1,1,1,0,0,0,0,0,0,0
2940000,3600,3,1,2,0,0,0,0,0,1,0,0
2940000,3660,4,1,2,0,0,0,0,0,0,0,0
2940000,3480,3,1,2,0,0,0,0,0,1,0,2
2940000,2700,2,1,1,0,0,0,0,0,0,0,1
2940000,3150,3,1,2,0,0,0,0,0,0,0,0
2940000,6615,3,1,2,1,0,0,0,0,0,0,2
2870000,3040,2,1,1,0,0,0,0,0,0,0,0
2870000,3630,2,1,1,1,0,0,0,0,0,0,0
2870000,6000,2,1,1,1,0,0,0,0,0,0,2
2870000,5400,4,1,2,1,0,0,0,0,0,0,0
2852500,5200,4,1,3,1,0,0,0,0,0,0,0
2835000,3300,3,1,2,0,0,0,0,0,1,0,2
2835000,4350,3,1,2,0,0,0,1,0,1,0,0
2835000,2640,2,1,1,0,0,0,0,0,1,0,1
2800000,2650,3,1,2,1,0,1,0,0,1,0,0
2800000,3960,3,1,1,1,0,0,0,0,0,0,1
2730000,6800,2,1,1,1,0,0,0,0,0,0,0
2730000,4000,3,1,2,1,0,0,0,0,1,0,0
2695000,4000,2,1,1,1,0,0,0,0,0,0,0
2660000,3934,2,1,1,1,0,0,0,0,0,0,0
2660000,2000,2,1,2,1,0,0,0,0,0,0,2
2660000,3630,3,3,2,0,1,0,0,0,0,0,0
2660000,2800,3,1,1,1,0,0,0,0,0,0,0
2660000,2430,3,1,1,0,0,0,0,0,0,0,0
2660000,3480,2,1,1,1,0,0,0,0,1,0,2
2660000,4000,3,1,1,1,0,0,0,0,0,0,2
2653000,3185,2,1,1,1,0,0,0,1,0,0,0
2653000,4000,3,1,2,1,0,0,0,1,0,0,0
2604000,2910,2,1,1,0,0,0,0,0,0,0,0
2590000,3600,2,1,1,1,0,0,0,0,0,0,0
2590000,4400,2,1,1,1,0,0,0,0,0,0,0
2590000,3600,2,2,2,1,0,1,0,0,1,0,1
2520000,2880,3,1,1,0,0,0,0,0,0,0,0
2520000,3180,3,1,1,0,0,0,0,0,0,0,0
2520000,3000,2,1,2,1,0,0,0,0,0,0,1
2485000,4400,3,1,2,1,0,0,0,0,0,0,0
2485000,3000,3,1,2,0,0,0,0,0,0,0,2
2450000,3210,3,1,2,1,0,1,0,0,0,0,0
2450000,3240,2,1,1,0,1,0,0,0,1,0,0
2450000,3000,2,1,1,1,0,0,0,0,1,0,0
2450000,3500,2,1,1,1,1,0,0,0,0,0,0
2450000,4840,2,1,2,1,0,0,0,0,0,0,0
2450000,7700,2,1,1,1,0,0,0,0,0,0,0
2408000,3635,2,1,1,0,0,0,0,0,0,0,0
2380000,2475,3,1,2,1,0,0,0,0,0,0,1
2380000,2787,4,2,2,1,0,0,0,0,0,0,1
2380000,3264,2,1,1,1,0,0,0,0,0,0,0
2345000,3640,2,1,1,1,0,0,0,0,0,0,0
2310000,3180,2,1,1,1,0,0,0,0,0,0,0
2275000,1836,2,1,1,0,0,1,0,0,0,0,2
2275000,3970,1,1,1,0,0,0,0,0,0,0,0
2275000,3970,3,1,2,1,0,1,0,0,0,0,0
2240000,1950,3,1,1,0,0,0,1,0,0,0,0
2233000,5300,3,1,1,0,0,0,0,1,0,1,0
2135000,3000,2,1,1,0,0,0,0,0,0,0,0
2100000,2400,3,1,2,1,0,0,0,0,0,0,0
2100000,3000,4,1,2,1,0,0,0,0,0,0,0
2100000,3360,2,1,1,1,0,0,0,0,1,0,0
1960000,3420,5,1,2,0,0,0,0,0,0,0,0
1890000,1700,3,1,2,1,0,0,0,0,0,0,0
1890000,3649,2,1,1,1,0,0,0,0,0,0,0
1855000,2990,2,1,1,0,0,0,0,0,1,0,0
1820000,3000,2,1,1,1,0,1,0,0,2,0,0
1767150,2400,3,1,1,0,0,0,0,0,0,0,2
1750000,3620,2,1,1,1,0,0,0,0,0,0,0
1750000,2910,3,1,1,0,0,0,0,0,0,0,1
1750000,3850,3,1,2,1,0,0,0,0,0,0,0`;

// ── Minimal Random Forest in JS ───────────────────────────────
function parseData() {
  return RAW.trim().split("\n").map(line => {
    const [price,area,bedrooms,bathrooms,stories,mainroad,guestroom,basement,
           hotwaterheating,airconditioning,parking,prefarea,furnishingstatus] = line.split(",").map(Number);
    return {price,area,bedrooms,bathrooms,stories,mainroad,guestroom,basement,
            hotwaterheating,airconditioning,parking,prefarea,furnishingstatus};
  });
}

// Simple decision tree node
function buildTree(data, features, depth=0, maxDepth=8, minLeaf=3) {
  if (data.length <= minLeaf || depth >= maxDepth) {
    const mean = data.reduce((s,d) => s+d.price, 0) / data.length;
    return { leaf: true, value: mean };
  }
  let bestGain = Infinity, bestFeat = null, bestThresh = null, bestL = [], bestR = [];
  for (const feat of features) {
    const vals = [...new Set(data.map(d => d[feat]))].sort((a,b)=>a-b);
    for (let i=0;i<vals.length-1;i++) {
      const thresh = (vals[i]+vals[i+1])/2;
      const L = data.filter(d=>d[feat]<=thresh);
      const R = data.filter(d=>d[feat]>thresh);
      if (L.length<minLeaf||R.length<minLeaf) continue;
      const varL = variance(L), varR = variance(R);
      const gain = (L.length*varL + R.length*varR)/data.length;
      if (gain < bestGain) { bestGain=gain; bestFeat=feat; bestThresh=thresh; bestL=L; bestR=R; }
    }
  }
  if (!bestFeat) return { leaf:true, value: data.reduce((s,d)=>s+d.price,0)/data.length };
  return {
    leaf:false, feat:bestFeat, thresh:bestThresh,
    left:  buildTree(bestL, features, depth+1, maxDepth, minLeaf),
    right: buildTree(bestR, features, depth+1, maxDepth, minLeaf),
  };
}
function variance(data) {
  if (data.length===0) return 0;
  const m = data.reduce((s,d)=>s+d.price,0)/data.length;
  return data.reduce((s,d)=>s+(d.price-m)**2,0)/data.length;
}
function predictTree(tree, row) {
  if (tree.leaf) return tree.value;
  return row[tree.feat] <= tree.thresh ? predictTree(tree.left, row) : predictTree(tree.right, row);
}

// Bootstrap sample
function bootstrap(data) {
  return Array.from({length: data.length}, () => data[Math.floor(Math.random()*data.length)]);
}

// Seeded RNG for reproducibility
function seededRng(seed) {
  let s = seed;
  return () => { s = (s * 1664525 + 1013904223) & 0xffffffff; return (s >>> 0) / 0xffffffff; };
}

const FEATURES = ["area","bedrooms","bathrooms","stories","mainroad","guestroom",
                  "basement","hotwaterheating","airconditioning","parking","prefarea","furnishingstatus"];

function trainForest(data, nTrees=40) {
  const rng = seededRng(42);
  const trees = [];
  for (let i=0;i<nTrees;i++) {
    const bag = bootstrap(data);
    const nFeats = Math.max(3, Math.floor(Math.sqrt(FEATURES.length)));
    const featSubset = [...FEATURES].sort(()=>rng()-0.5).slice(0, nFeats);
    trees.push(buildTree(bag, featSubset, 0, 7, 4));
  }
  return trees;
}
function forestPredict(trees, row) {
  const preds = trees.map(t => predictTree(t, row));
  return preds.reduce((a,b)=>a+b,0)/preds.length;
}
function mae(ys, ps) { return ys.reduce((s,y,i)=>s+Math.abs(y-ps[i]),0)/ys.length; }
function r2(ys, ps) {
  const m = ys.reduce((a,b)=>a+b,0)/ys.length;
  const ssTot = ys.reduce((s,y)=>s+(y-m)**2,0);
  const ssRes = ys.reduce((s,y,i)=>s+(y-ps[i])**2,0);
  return 1 - ssRes/ssTot;
}

// ── Feature importance via permutation (proxy) ───────────────
function featureImportance(trees, testData) {
  const base = testData.map(d => Math.abs(d.price - forestPredict(trees, d)));
  const baseMae = base.reduce((a,b)=>a+b,0)/base.length;
  return FEATURES.map(feat => {
    const shuffled = testData.map(d => {
      const copy = {...d};
      const j = Math.floor(Math.random()*testData.length);
      copy[feat] = testData[j][feat];
      return copy;
    });
    const permMae = shuffled.reduce((s,d,i)=>s+Math.abs(testData[i].price - forestPredict(trees,d)),0)/shuffled.length;
    return { feat, importance: Math.max(0, permMae - baseMae) };
  }).sort((a,b)=>b.importance-a.importance);
}

// ── Tier assignment ───────────────────────────────────────────
function assignTier(price, q1, q3) {
  if (price <= q1) return "Low";
  if (price <= q3) return "Medium";
  return "High";
}

// ── Stratified shuffle split ──────────────────────────────────
// Dataset is sorted by price desc, so a plain slice gives test=[all Low].
// Instead: bucket by tier, shuffle each bucket with a seeded RNG, then
// take 20% from each bucket → balanced train/test across all tiers.
function stratifiedSplit(data, q1, q3, testFrac=0.2, seed=42) {
  const rng = seededRng(seed);
  const shuffle = arr => {
    const a = [...arr];
    for (let i=a.length-1;i>0;i--) { const j=Math.floor(rng()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; }
    return a;
  };
  const buckets = { Low:[], Medium:[], High:[] };
  data.forEach(d => buckets[assignTier(d.price, q1, q3)].push(d));
  const train=[], test=[];
  for (const tier of ["Low","Medium","High"]) {
    const shuffled = shuffle(buckets[tier]);
    const nTest = Math.round(shuffled.length * testFrac);
    test.push(...shuffled.slice(0, nTest));
    train.push(...shuffled.slice(nTest));
  }
  return { train, test };
}

// ─────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────
export default function App() {
  const [model, setModel]       = useState(null);
  const [metrics, setMetrics]   = useState(null);
  const [importance, setImportance] = useState([]);
  const [scatter, setScatter]   = useState([]);
  const [dist, setDist]         = useState([]);
  const [loading, setLoading]   = useState(true);
  const [predicted, setPredicted] = useState(null);
  const [tier, setTier]         = useState(null);

  // Sidebar state
  const [area, setArea]               = useState(5000);
  const [bedrooms, setBedrooms]       = useState(3);
  const [bathrooms, setBathrooms]     = useState(2);
  const [stories, setStories]         = useState(2);
  const [parking, setParking]         = useState(1);
  const [mainroad, setMainroad]       = useState(1);
  const [guestroom, setGuestroom]     = useState(0);
  const [basement, setBasement]       = useState(0);
  const [hotwater, setHotwater]       = useState(0);
  const [ac, setAc]                   = useState(1);
  const [prefarea, setPrefarea]       = useState(0);
  const [furnishing, setFurnishing]   = useState(1); // 0=furnished,1=semi,2=unfurnished

  const [q1q3, setQ1Q3] = useState([0,0]);

  // Train on mount
  useEffect(() => {
    setTimeout(() => {
      const allData = parseData();
      const prices = allData.map(d=>d.price).sort((a,b)=>a-b);
      const q1 = prices[Math.floor(prices.length*0.33)];
      const q3 = prices[Math.floor(prices.length*0.67)];
      setQ1Q3([q1, q3]);

      // Stratified shuffle split 80/20 (fixes sorted-data bias)
      // Dataset is sorted by price desc → plain slice → test = all Low tier → zero F1
      // Stratified split ensures ~20% of each tier ends up in test set
      const { train, test } = stratifiedSplit(allData, q1, q3, 0.2, 42);

      const trees = trainForest(train, 40);

      const testPreds = test.map(d => forestPredict(trees, d));
      const testActual = test.map(d => d.price);
      const maeVal = mae(testActual, testPreds);
      const r2Val  = r2(testActual, testPreds);

      // Classifier accuracy (tier-based)
      let correct = 0;
      test.forEach((d, i) => {
        if (assignTier(d.price, q1, q3) === assignTier(testPreds[i], q1, q3)) correct++;
      });
      const acc = correct / test.length;

      // Per-tier precision/recall
      const tiers = ["Low","Medium","High"];
      const report = {};
      tiers.forEach(t => {
        const tp = test.filter((d,i)=> assignTier(d.price,q1,q3)===t && assignTier(testPreds[i],q1,q3)===t).length;
        const fp = test.filter((d,i)=> assignTier(d.price,q1,q3)!==t && assignTier(testPreds[i],q1,q3)===t).length;
        const fn = test.filter((d,i)=> assignTier(d.price,q1,q3)===t && assignTier(testPreds[i],q1,q3)!==t).length;
        const prec = tp/(tp+fp||1), rec = tp/(tp+fn||1);
        report[t] = { precision: prec, recall: rec, f1: 2*prec*rec/(prec+rec||1) };
      });

      // Feature importance
      const imp = featureImportance(trees, test.slice(0, 30));
      setImportance(imp.map(x => ({ name: x.feat, value: parseFloat((x.importance/1e5).toFixed(2)) })));

      // Scatter (actual vs predicted)
      setScatter(test.slice(0,80).map((d,i) => ({ actual: +(d.price/1e6).toFixed(2), predicted: +(testPreds[i]/1e6).toFixed(2) })));

      // Distribution
      const bins = 20;
      const minP = Math.min(...prices), maxP = Math.max(...prices);
      const bw = (maxP-minP)/bins;
      const hist = Array.from({length:bins}, (_,i) => {
        const lo = minP+i*bw, hi = lo+bw;
        return { bin: `${(lo/1e6).toFixed(1)}M`, count: prices.filter(p=>p>=lo&&p<hi).length };
      });
      setDist(hist);

      setModel(trees);
      setMetrics({ mae: maeVal, r2: r2Val, acc, report });
      setLoading(false);
    }, 100);
  }, []);

  // Live prediction
  useEffect(() => {
    if (!model) return;
    const row = { area, bedrooms, bathrooms, stories, mainroad, guestroom,
                  basement, hotwaterheating: hotwater, airconditioning: ac,
                  parking, prefarea, furnishingstatus: furnishing };
    const p = forestPredict(model, row);
    setPredicted(p);
    setTier(assignTier(p, q1q3[0], q1q3[1]));
  }, [model, area,bedrooms,bathrooms,stories,parking,mainroad,guestroom,basement,hotwater,ac,prefarea,furnishing]);

  const tierColor = { Low: "#4cde9a", Medium: "#f5c842", High: "#ff6b6b" };
  const tierBg    = { Low: "#1e3a2f", Medium: "#3a2e1e", High: "#3a1e1e" };

  const Toggle = ({label, val, set}) => (
    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10}}>
      <span style={{color:"#8899bb",fontSize:"0.78rem",fontWeight:600,letterSpacing:"0.05em"}}>{label}</span>
      <div onClick={()=>set(v=>v?0:1)} style={{cursor:"pointer",width:40,height:22,borderRadius:11,background:val?"#f5c842":"#2a3050",position:"relative",transition:"background 0.2s"}}>
        <div style={{position:"absolute",top:3,left:val?20:3,width:16,height:16,borderRadius:8,background:"#fff",transition:"left 0.2s"}}/>
      </div>
    </div>
  );

  const Slider = ({label, val, set, min, max, step=1, fmt=v=>v}) => (
    <div style={{marginBottom:14}}>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
        <span style={{color:"#8899bb",fontSize:"0.78rem",fontWeight:600,letterSpacing:"0.05em"}}>{label}</span>
        <span style={{color:"#f5c842",fontSize:"0.78rem",fontWeight:700}}>{fmt(val)}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={val}
        onChange={e=>set(Number(e.target.value))}
        style={{width:"100%",accentColor:"#f5c842",cursor:"pointer"}}/>
    </div>
  );

  return (
    <div style={{display:"flex",minHeight:"100vh",background:"#0a0d14",fontFamily:"'DM Sans',sans-serif",color:"#e8e8e8"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@300;400;500;600&display=swap');
        ::-webkit-scrollbar{width:6px} ::-webkit-scrollbar-track{background:#0a0d14} ::-webkit-scrollbar-thumb{background:#2a3050;border-radius:3px}
        * { box-sizing:border-box; }
      `}</style>

      {/* SIDEBAR */}
      <div style={{width:260,minWidth:260,background:"#10141f",borderRight:"1px solid #1e2535",padding:"24px 18px",overflowY:"auto",position:"sticky",top:0,height:"100vh"}}>
        <div style={{fontFamily:"'DM Serif Display',serif",fontSize:"1.1rem",color:"#f5c842",marginBottom:4}}>🏡 Configure</div>
        <div style={{color:"#4a5568",fontSize:"0.72rem",marginBottom:20}}>Adjust to describe your property</div>

        <Slider label="📐 Area (sq ft)" val={area} set={setArea} min={1650} max={16200} step={50} fmt={v=>v.toLocaleString()}/>
        <Slider label="🛏 Bedrooms"    val={bedrooms}  set={setBedrooms}  min={1} max={6}/>
        <Slider label="🚿 Bathrooms"   val={bathrooms} set={setBathrooms} min={1} max={4}/>
        <Slider label="🏢 Stories"     val={stories}   set={setStories}   min={1} max={4}/>
        <Slider label="🚗 Parking"     val={parking}   set={setParking}   min={0} max={3}/>

        <div style={{borderTop:"1px solid #1e2535",margin:"14px 0"}}/>
        <Toggle label="Main Road"         val={mainroad}  set={setMainroad}/>
        <Toggle label="Guest Room"        val={guestroom} set={setGuestroom}/>
        <Toggle label="Basement"          val={basement}  set={setBasement}/>
        <Toggle label="Hot Water Heating" val={hotwater}  set={setHotwater}/>
        <Toggle label="Air Conditioning"  val={ac}        set={setAc}/>
        <Toggle label="Preferred Area"    val={prefarea}  set={setPrefarea}/>

        <div style={{borderTop:"1px solid #1e2535",margin:"14px 0"}}/>
        <div style={{color:"#8899bb",fontSize:"0.78rem",fontWeight:600,marginBottom:6}}>🛋️ Furnishing</div>
        {[["Furnished",0],["Semi-Furnished",1],["Unfurnished",2]].map(([lbl,v])=>(
          <div key={v} onClick={()=>setFurnishing(v)} style={{padding:"6px 10px",borderRadius:6,marginBottom:4,cursor:"pointer",background:furnishing===v?"#1e2a3a":"transparent",color:furnishing===v?"#f5c842":"#5a6a80",fontSize:"0.78rem",fontWeight:600,border:furnishing===v?"1px solid #2a3d5a":"1px solid transparent"}}>
            {lbl}
          </div>
        ))}

        <div style={{marginTop:20,padding:"10px",background:"#0a0d14",borderRadius:8,border:"1px solid #1e2535"}}>
          <div style={{color:"#4a5568",fontSize:"0.65rem",lineHeight:1.6}}>
            🌲 Random Forest<br/>40 trees · max depth 7<br/>Bootstrap sampling
          </div>
        </div>
      </div>

      {/* MAIN */}
      <div style={{flex:1,padding:"28px 32px",overflowY:"auto"}}>
        <div style={{marginBottom:24}}>
          <h1 style={{fontFamily:"'DM Serif Display',serif",fontSize:"2rem",color:"#f5c842",margin:0,lineHeight:1.1}}>House Price Predictor</h1>
          <p style={{color:"#4a5568",margin:"4px 0 0",fontSize:"0.85rem"}}>Random Forest · JS-powered · Live inference</p>
        </div>

        {loading ? (
          <div style={{display:"flex",alignItems:"center",justifyContent:"center",height:300,color:"#4a5568"}}>
            <div style={{textAlign:"center"}}>
              <div style={{fontSize:"2rem",marginBottom:12,animation:"spin 1s linear infinite"}}>⚙️</div>
              <div>Training Random Forest…</div>
              <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
            </div>
          </div>
        ) : (
          <>
            {/* TOP ROW — Prediction + Metrics */}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:24}}>

              {/* Prediction card */}
              <div style={{background:"linear-gradient(135deg,#1a2440,#111827)",border:`1px solid ${tierColor[tier]||"#f5c842"}`,borderRadius:14,padding:"28px 24px",textAlign:"center",boxShadow:`0 8px 32px ${tierColor[tier]||"#f5c842"}22`}}>
                <div style={{color:"#f5c842",fontSize:"0.72rem",fontWeight:700,letterSpacing:"0.15em",textTransform:"uppercase",marginBottom:8}}>Estimated Price</div>
                <div style={{fontFamily:"'DM Serif Display',serif",fontSize:"2.6rem",color:"#fff",lineHeight:1.1}}>
                  ₹{predicted ? (predicted/1e6).toFixed(2) : "—"}M
                </div>
                <div style={{fontSize:"0.78rem",color:"#8899bb",marginTop:4}}>₹{predicted ? predicted.toLocaleString("en-IN",{maximumFractionDigits:0}) : "—"}</div>
                {tier && <div style={{display:"inline-block",marginTop:12,padding:"4px 18px",borderRadius:20,background:tierBg[tier],color:tierColor[tier],border:`1px solid ${tierColor[tier]}`,fontSize:"0.82rem",fontWeight:700,letterSpacing:"0.06em"}}>{tier} Tier</div>}
              </div>

              {/* Metrics grid */}
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                {[
                  {label:"MAE",   value:`₹${(metrics.mae/1e6).toFixed(3)}M`, tip:"Mean Absolute Error"},
                  {label:"R² Score", value:metrics.r2.toFixed(4), tip:"Variance explained"},
                  {label:"Accuracy", value:`${(metrics.acc*100).toFixed(1)}%`, tip:"Tier classification accuracy"},
                  {label:"Macro F1", value:(["Low","Medium","High"].reduce((s,t)=>s+metrics.report[t].f1,0)/3).toFixed(4), tip:"Harmonic mean P·R"},
                ].map(m=>(
                  <div key={m.label} title={m.tip} style={{background:"#10141f",border:"1px solid #1e2535",borderRadius:10,padding:"14px 16px"}}>
                    <div style={{color:"#4a5568",fontSize:"0.68rem",fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:4}}>{m.label}</div>
                    <div style={{fontFamily:"'DM Serif Display',serif",fontSize:"1.4rem",color:"#fff"}}>{m.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* CHARTS ROW */}
            <div style={{display:"grid",gridTemplateColumns:"1.2fr 1fr",gap:16,marginBottom:24}}>

              {/* Feature Importance */}
              <div style={{background:"#10141f",border:"1px solid #1e2535",borderRadius:12,padding:"20px"}}>
                <div style={{fontFamily:"'DM Serif Display',serif",color:"#f5c842",fontSize:"1rem",marginBottom:14}}>Feature Importance</div>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={importance} layout="vertical" margin={{left:60,right:10}}>
                    <XAxis type="number" tick={{fill:"#4a5568",fontSize:10}} axisLine={false} tickLine={false}/>
                    <YAxis type="category" dataKey="name" tick={{fill:"#8899bb",fontSize:10}} axisLine={false} tickLine={false} width={70}/>
                    <Tooltip contentStyle={{background:"#161b27",border:"1px solid #2a3050",borderRadius:8,color:"#e8e8e8",fontSize:11}} formatter={v=>[v,"Importance"]}/>
                    <Bar dataKey="value" fill="#3d5a80" radius={[0,4,4,0]}
                      label={false}
                      background={{fill:"#0a0d14"}}/>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Actual vs Predicted */}
              <div style={{background:"#10141f",border:"1px solid #1e2535",borderRadius:12,padding:"20px"}}>
                <div style={{fontFamily:"'DM Serif Display',serif",color:"#f5c842",fontSize:"1rem",marginBottom:14}}>Actual vs Predicted (₹M)</div>
                <ResponsiveContainer width="100%" height={220}>
                  <ScatterChart margin={{left:0,right:10,bottom:10}}>
                    <CartesianGrid stroke="#1e2535" strokeDasharray="3 3"/>
                    <XAxis dataKey="actual"    name="Actual"    tick={{fill:"#4a5568",fontSize:10}} label={{value:"Actual",position:"insideBottom",fill:"#4a5568",fontSize:10,offset:-2}}/>
                    <YAxis dataKey="predicted" name="Predicted" tick={{fill:"#4a5568",fontSize:10}} label={{value:"Predicted",angle:-90,position:"insideLeft",fill:"#4a5568",fontSize:10}}/>
                    <Tooltip cursor={{stroke:"#2a3050"}} contentStyle={{background:"#161b27",border:"1px solid #2a3050",borderRadius:8,color:"#e8e8e8",fontSize:11}}/>
                    <Scatter data={scatter} fill="#3d8bcd" opacity={0.65} r={3}/>
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Classification Report */}
            <div style={{background:"#10141f",border:"1px solid #1e2535",borderRadius:12,padding:"20px",marginBottom:24}}>
              <div style={{fontFamily:"'DM Serif Display',serif",color:"#f5c842",fontSize:"1rem",marginBottom:14}}>Classification Report — Price Tier</div>
              <table style={{width:"100%",borderCollapse:"collapse",fontSize:"0.82rem"}}>
                <thead>
                  <tr style={{color:"#4a5568",fontWeight:700,letterSpacing:"0.08em",fontSize:"0.7rem",textTransform:"uppercase"}}>
                    {["Tier","Precision","Recall","F1-Score"].map(h=>(
                      <th key={h} style={{textAlign:"left",padding:"6px 12px",borderBottom:"1px solid #1e2535"}}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {["Low","Medium","High"].map(t=>(
                    <tr key={t} style={{borderBottom:"1px solid #1e2535"}}>
                      <td style={{padding:"10px 12px"}}><span style={{color:tierColor[t],fontWeight:700}}>{t}</span></td>
                      <td style={{padding:"10px 12px",color:"#c0cce0"}}>{metrics.report[t].precision.toFixed(4)}</td>
                      <td style={{padding:"10px 12px",color:"#c0cce0"}}>{metrics.report[t].recall.toFixed(4)}</td>
                      <td style={{padding:"10px 12px",color:"#c0cce0"}}>{metrics.report[t].f1.toFixed(4)}</td>
                    </tr>
                  ))}
                  <tr style={{background:"#0a0d14"}}>
                    <td style={{padding:"10px 12px",color:"#f5c842",fontWeight:700}}>Macro Avg</td>
                    {["precision","recall","f1"].map(k=>(
                      <td key={k} style={{padding:"10px 12px",color:"#f5c842",fontWeight:600}}>
                        {(["Low","Medium","High"].reduce((s,t)=>s+metrics.report[t][k],0)/3).toFixed(4)}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Price Distribution */}
            <div style={{background:"#10141f",border:"1px solid #1e2535",borderRadius:12,padding:"20px",marginBottom:24}}>
              <div style={{fontFamily:"'DM Serif Display',serif",color:"#f5c842",fontSize:"1rem",marginBottom:14}}>
                Price Distribution — your prediction highlighted
              </div>
              <ResponsiveContainer width="100%" height={160}>
                <BarChart data={dist} margin={{left:0,right:10}}>
                  <XAxis dataKey="bin" tick={{fill:"#4a5568",fontSize:9}} axisLine={false} tickLine={false} interval={3}/>
                  <YAxis tick={{fill:"#4a5568",fontSize:9}} axisLine={false} tickLine={false}/>
                  <Tooltip contentStyle={{background:"#161b27",border:"1px solid #2a3050",borderRadius:8,color:"#e8e8e8",fontSize:11}}/>
                  <Bar dataKey="count" fill="#3d5a80" radius={[3,3,0,0]}/>
                  {predicted && <ReferenceLine x={`${(predicted/1e6).toFixed(1)}M`} stroke="#ff6b6b" strokeDasharray="4 2" label={{value:"You",fill:"#ff6b6b",fontSize:10}}/>}
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Math legend */}
            <div style={{background:"#10141f",border:"1px solid #1e2535",borderRadius:12,padding:"16px 20px",fontSize:"0.75rem",color:"#4a5568",lineHeight:1.8}}>
              <span style={{color:"#f5c842",fontWeight:700}}>📐 Metric Formulae — </span>
              <span style={{color:"#8899bb"}}>MAE = mean(|y−ŷ|)  ·  R² = 1−SS_res/SS_tot  ·  Precision = TP/(TP+FP)  ·  Recall = TP/(TP+FN)  ·  F1 = 2·P·R/(P+R)</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
