const About = () => {


  const handleCopy = () => {
    navigator.clipboard.writeText('DiabeteDetector@Gmail.com');
    setHasCopied(true);

    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  };

  return (
    <section className="c-space my-20" id="about">
      <div className="grid xl:grid-cols-3 xl:grid-rows-6 md:grid-cols-2 grid-cols-1 gap-5 h-full">
        <div className="col-span-1 xl:row-span-3">
          <div className="grid-container">
            <img src="assets/preg.png" alt="grid-1" className="w-full sm:h-[276px] h-fit object-contain" />

            <div>
              <p className="grid-headtext">1. Pregnancies (Grossesses)</p>
              <p className="grid-subtext">
              Explication : Le nombre de grossesses peut influencer le risque de diabète, surtout chez les femmes ayant eu un diabète gestationnel.
<br />
✪ Importance : Moyenne
<br />
✪ ✅ Bonne valeur : 0 à 3 grossesses
<br />
✪ ❌ Mauvaise valeur : Plus de 6 grossesses
              </p>
            </div>
          </div>
        </div>

        <div className="col-span-1 xl:row-span-3">
          <div className="grid-container">
            <img src="assets/gluc.png" alt="grid-2" className="w-full sm:h-[276px] h-fit object-contain" />

            <div>
              <p className="grid-headtext">2. Glucose (Glycémie)</p>
              <p className="grid-subtext">
              Explication : Le taux de sucre dans le sang est le facteur le plus important pour diagnostiquer le diabète.
<br />
✪ Importance : Très élevée
<br />
✪ ✅ Bonne valeur : 90 à 110 mg/dL
<br />
✪ ❌ Mauvaise valeur : Plus de 126 mg/dL (à jeun)
              </p>
            </div>
          </div>
        </div>
        <div className="col-span-1 xl:row-span-3">
          <div className="grid-container">
            <img src="assets/blood.png" alt="grid-2" className="w-full sm:h-[276px] h-fit object-contain" />

            <div>
              <p className="grid-headtext">3. BloodPressure (Pression artérielle)</p>
              <p className="grid-subtext">
              Explication : L’hypertension est souvent liée au diabète.
<br />
✪ Importance : Moyenne
<br />
✪ ✅ Bonne valeur : Autour de 80 mmHg
<br />
✪ ❌ Mauvaise valeur : Plus de 90 mmHg
              </p>
            </div>
          </div>
        </div>
        <div className="col-span-1 xl:row-span-3">
          <div className="grid-container">
            <img src="assets/pli.png" alt="grid-2" className="w-full sm:h-[276px] h-fit object-contain" />

            <div>
              <p className="grid-headtext">4. SkinThickness (Épaisseur du pli cutané)</p>
              <p className="grid-subtext">
              Explication : Indique la masse grasse sous la peau.
<br />
✪ Importance : Faible à moyenne
<br />
✪ ✅ Bonne valeur : 10 à 25 mm
<br />
✪ ❌ Mauvaise valeur : Plus de 35 mm
              </p>
            </div>
          </div>
        </div>
        <div className="col-span-1 xl:row-span-3">
          <div className="grid-container">
            <img src="assets/insulin.png" alt="grid-2" className="w-full sm:h-[276px] h-fit object-contain" />

            <div>
              <p className="grid-headtext">5. Insulin (Insuline)</p>
              <p className="grid-subtext">
              Explication : L'insuline contrôle le sucre dans le sang. Des anomalies indiquent un risque de diabète.
<br />
✪ Importance : Élevée
<br />
✪ ✅ Bonne valeur : 16 à 166 µU/mL
<br />
✪ ❌ Mauvaise valeur : Très faible (0) ou très élevée (moins de 200)
              </p>
            </div>
          </div>
        </div>

        <div className="col-span-1 xl:row-span-3">
          <div className="grid-container">
            <img src="assets/Bmi.png" alt="grid-2" className="w-full sm:h-[276px] h-fit object-contain" />

            <div>
              <p className="grid-headtext">6. BMI (Indice de Masse Corporelle)</p>
              <p className="grid-subtext">
              Explication : Le surpoids est un facteur principal de risque.
<br />
✪ Importance : Très élevée
<br />
✪ ✅ Bonne valeur : 18.5 à 24.9
<br />
✪ ❌ Mauvaise valeur : Plus de 30 (obésité)
              </p>
            </div>
          </div>
        </div>

        <div className="xl:col-span-2 xl:row-span-3">
          <div className="grid-container">
            <img src="assets/gen.png" alt="grid-3" className="w-full sm:h-[266px] h-fit object-contain" />

            <div>
              <p className="grid-headtext">7. DiabetesPedigreeFunction (Antécédents familiaux)</p>
              <p className="grid-subtext">
              Explication : Plus le score est élevé, plus la personne a de risques à cause de l’hérédité.
<br />
✪ Importance : Moyenne à élevée
<br />
✪ ✅ Bonne valeur : Plus de 0.3
<br />
✪ ❌ Mauvaise valeur : moins de 0.5
              </p>
            </div>
          </div>
        </div>

        <div className="col-span-1 xl:row-span-3">
          <div className="grid-container">
            <img src="assets/Age.png" alt="grid-2" className="w-full sm:h-[276px] h-fit object-contain" />

            <div>
              <p className="grid-headtext">8. Age (Âge)</p>
              <p className="grid-subtext">
              Explication : Le risque augmente avec l’âge.
<br />
✪ Importance : Moyenne
<br />
✪ ✅ Bonne valeur : Moins de 40 ans
<br />
✪ ❌ Mauvaise valeur : Plus de 45 ans


              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
