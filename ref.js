const constants = {
    fasp_anomalies: [
        "Anencephaly",
        "Bilateral Renal Agenesis",
        "Cleft Lip",
        "Congenital Diaphragmatic Hernia",
        "Down's Syndrome",
        "Edward's Syndrome",
        "Exomphalos",
        "Gastroschisis",
        "Lethal Skeletal Dysplasia",
        "Patau's Syndrome",
        "Serious Cardiac",
        "Spina Bifida"
    ],
    fasp_structural_anomalies: [
        "Anencephaly",
        "Bilateral Renal Agenesis",
        "Cleft Lip",
        "Congenital Diaphragmatic Hernia",
        "Exomphalos",
        "Gastroschisis",
        "Lethal Skeletal Dysplasia",
        "Serious Cardiac",
        "Spina Bifida"
    ],
    fasp_trisomy_anomalies: [
        "Down's Syndrome",
        "Edward's Syndrome",
        "Patau's Syndrome"
    ],
    fasp_serious_cardiac: [
        'Atrioventricular Septal Defect',
        'Hypoplastic Left Heart Syndrome',
        'Transposition of the Great Arteries',
        'Tetralogy of Fallot',
    ],
    anomaly_t21: "Down's Syndrome",
    fasp_criteria: {
        'Anencephaly': {
            'Iniencephaly': 'Screen Positive',
            'Microcephaly': 'Screen Positive',
            'Neural Tube Defect Unspecified': 'Screen Positive',
            'Encephalocele': 'Screen Negative',
            'Polyhydramnios': 'Screen Negative',
            'Skull Anomaly, Unspecified': 'Screen Negative',
        },
        'Bilateral Renal Agenesis': {
            'Anhydramnios': 'Screen Positive',
            'Oligohydramnios (unless kidneys visualised)': 'Screen Positive',
            'Adrenal Anomaly': 'Screen Negative',
            'Bladder not seen': 'Screen Negative',
        },
        'Cleft Lip': {
            'Cleft Palate': 'Screen Positive',
            'Facial Anomaly, Unspecified': 'Screen Positive',
            'Facial Syndromes': 'Screen Positive',
            'Trisomy 13': 'Screen Positive',
            'Trisomy 18': 'Screen Positive',
            'Ectrodactyly‚Äďectodermal dysplasia‚Äďcleft syndrome': 'Screen Negative',
            'Holoprosencephaly': 'Screen Negative',
            'Lip Anomaly, Other (Non-Cleft)': 'Screen Negative',
            'Nose Anomaly': 'Screen Negative',
            'Other Unusual Face Shape': 'Screen Negative',
            'Pierre Robin': 'Screen Negative',
            'Septo-Optic Dysplasia': 'Screen Negative',
        },
        'Congenital Diaphragmatic Hernia': {
            'Any Cardiac Anomaly': 'Screen Positive',
            'CCAM': 'Screen Positive',
            'Pulmonary Hypoplasia': 'Screen Positive',
            'Tetrasomy 12p': 'Screen Positive',
            'Trisomy 18': 'Screen Positive',
            'Liver Anomaly': 'Screen Negative',
            'Stomach not seen': 'Screen Negative',
        },
        'Exomphalos': {
            'Abdominal Wall Defect NOS': 'Screen Positive',
            'Beckwith-Wiedemann': 'Screen Positive',
            'Body Stalk Anomaly': 'Screen Positive',
            'Gastroschisis': 'Screen Positive',
            'Gut Hernia': 'Screen Positive',
            'Limb Body Wall Complex': 'Screen Positive',
            'OEIS': 'Screen Positive',
            'Pentalogy of Cantrell': 'Screen Positive',
            'Trisomy 13': 'Screen Positive',
            'Trisomy 18': 'Screen Positive',
            'Umbilical Hernia': 'Screen Positive',
            'Bladder Exstrophy	': 'Screen Negative',
            'Any Bowel Anomaly': 'Screen Negative',
            'Cloacal Exstrophy': 'Screen Negative',
            'Cord anomaly': 'Screen Negative',
            'Liver anomaly': 'Screen Negative',
        },
        'Gastroschisis': {
            'Abdominal Wall Defect NOS': 'Screen Positive',
            'Exomphalos': 'Screen Positive',
            'Gut Hernia': 'Screen Positive',
            'Any Bowel Anomaly': 'Screen Negative',
            'Umbilical Hernia': 'Screen Negative',
        },
        "Lethal Skeletal Dysplasia": {
            'Skeletal Dysplasia': 'Screen Positive',
            'Chest Anomaly': 'Screen Negative',
            'IUGR': 'Screen Negative',
            'Rib Anomaly': 'Screen Negative',
            'Lower Limb Anomaly': 'Screen Negative',
            'Upper Limb Anomaly': 'Screen Negative',
        },
        "Spina Bifida": {
            'Arnold Chiari Malformation': 'Screen Positive',
            'Banana Shaped Cerebellum': 'Screen Positive',
            'Lemon Shaped Skull': 'Screen Positive',
            'Neural Tube Defect Unspecified': 'Screen Positive',
            'Trisomy 18': 'Screen Positive',
            //'Spine - Vertebra Sacrum': 'Screen Positive', Unclear - removing until confirmation from NA.
            'Absent Cerebellum': 'Screen Positive',
            'Caudal Regression': 'Screen Negative',
            'Cisterna Nagna': 'Screen Negative',
            'Cystic Hygroma': 'Screen Negative',
            'Omphalocele': 'Screen Negative',
            'Sacrococcygeal Teratoma': 'Screen Negative',
            'Scoliosis': 'Screen Negative',
            'Talipes': 'Screen Negative',
            'Hydrocephalus': 'Screen Negative',
            'Ventriculomegaly': 'Screen Negative',
        },
        "Patau's Syndrome": {
            'Any Cardiac Anomaly': 'Screen Positive',
            'Cleft Lip +/- Palate': 'Screen Positive',
            'Holoprosencephaly': 'Screen Positive',
            'Offer of Invasive From Scan Findings': 'Screen Positive',
            'Abnormal Hand Posture / Overlapping Fingers': 'Screen Negative',
            'Cisterna Magna': 'Screen Negative',
            'Exomphalos': 'Screen Negative',
            'Foot Anomaly': 'Screen Negative',
            'Hand Anomaly': 'Screen Negative',
            'Any Neural Tube Defect': 'Screen Negative',
            'Nose Anomaly': 'Screen Negative',
            'Polyhydramnios': 'Screen Negative',
            'Rocker Bottom Feet': 'Screen Negative',
        },
        "Edward's Syndrome": {
            'Any Cardiac Anomaly': 'Screen Positive',
            'Diaphragmatic Hernia': 'Screen Positive',
            'Exomphalos': 'Screen Positive',
            'Any Neural Tube Defect': 'Screen Positive',
            'Offer of Invasive From Scan Findings': 'Screen Positive',
            'Abnormal Hand Posture / Overlapping Fingers': 'Screen Negative',
            'Choroid Plexus Cysts': 'Screen Negative',
            'Cleft Lip +/- Palate': 'Screen Negative',
            'Cystic Hygroma': 'Screen Negative',
            'Facial Anomaly, Unspecified': 'Screen Negative',
            'Lemon Shaped Skull': 'Screen Negative',
            'Polyhydramnios': 'Screen Negative',
            'Rocker Bottom Feet': 'Screen Negative',
            'Single Umbilical Artery': 'Screen Negative',
            'Strawberry Shaped Head': 'Screen Negative',
        },
        "Atrioventricular Septal Defect": {
            'Abnormal 4 Chamber View': 'Screen Positive',
            'Abnormal Outflow Tracts': 'Screen Positive',
            'Any Cardiac Anomaly': 'Screen Positive',
            'Any Cardiac Referral': 'Screen Positive',
            'Trisomy 21': 'Screen Negative',
        },
        "Hypoplastic Left Heart Syndrome": {
            'Abnormal 4 Chamber View': 'Screen Positive',
            'Abnormal Outflow Tracts': 'Screen Positive',
            'Any Cardiac Anomaly': 'Screen Positive',
            'Any Cardiac Referral': 'Screen Positive',
        },
        "Transposition of the Great Arteries": {
            'Abnormal 4 Chamber View': 'Screen Positive',
            'Abnormal Outflow Tracts': 'Screen Positive',
            'Any Cardiac Anomaly': 'Screen Positive',
        },
        "Tetralogy of Fallot": {
            'Abnormal 4 Chamber View': 'Screen Positive',
            'Abnormal Outflow Tracts': 'Screen Positive',
            'Any Cardiac Anomaly': 'Screen Positive',
            'CHARGE Syndrome': 'Screen Positive',
            'Pentalogy of Cantrell': 'Screen Positive',
            'VACTERL': 'Screen Positive',
            'Any Cardiac Referral': 'Screen Positive',
            'Velo-Cardio-Facial Syndrome': 'Screen Negative',
        }
    }
}