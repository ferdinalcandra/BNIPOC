<!DOCTYPE html>
<html lang="en">
<jsp:include page="partials/head.jsp" />
<body>
	<div class="container-scroller">
		<!-- partial:partials/_navbar.html -->
		<jsp:include page="partials/navbar.jsp" />
		<!-- partial -->
		<div class="container-fluid page-body-wrapper">
			<!-- partial:partials/_sidebar.html -->
			<jsp:include page="partials/sidebar.jsp" />
			<!-- partial -->
			<div class="main-panel">
		
		<div class="container">
			<p>
      		<label>1. Apakah persyaratan untuk diangkat menjadi anggota dewan komisaris ?</label> 
    		</p>  
    		<p><input type="radio" name="question1" value="Akhlak" id="correct1">Mempunyai akhlak, moral, dan integrase yang baik</p>
    		<p><input type="radio" name="question1" value="Pailit">Pernah dinyatakan pailit</p>
		</div>
		
		<div class="container">
			<p>
      		<label>2. Apakah pengertian dari struktur dewan komisaris ?</label> 
    		</p>  
    		<p><input type="radio" name="question2" value="Majelis">Dewan Komisaris merupakan Majelis, dan setiap anggota Dewan Komisaris dapat bertindak sendiri-sendiri</p>
    		<p><input type="radio" name="question2" value="Independen" id="correct2">Dewan Komisaris terdiri dari Komisaris dan Komisaris Independen</p>
		</div>
		
		<div class="container">
			<p>
      		<label>3. Sebutkan 4 Nilai Budaya Kerja BNI ?</label> 
    		</p>  
    		<p><input type="radio" name="question3" value="Profesionalisme" id="correct3">Profesionalisme, Integritas, Customer Orentation dan Continous Improvement</p>
    		<p><input type="radio" name="question3" value="Layanan">Memberikan layanan terbaik, Kreatif dan Inovatis, Jujur dan Ikhlas</p>
		</div>
		
		<div class="container">
			<p>
      		<label>4. Apakah arti dari transparansi ?</label> 
    		</p>  
    		<p><input type="radio" name="question4"  id="correct4">Kepemilikan sahamnya baik pada BNI maupun pada bank dan perusahaan lain, yang berkedudukan di dalam dan di luar negeri </p>
    		<p><input type="radio" name="question4"> Hal lain terkait dengan pemenuhan asas transparansi berdasarkan 6 Nilai Perilaku Utama Insan BNI</p>
		</div>
		
		<div class="container">
			<p>
      		<label>5. Siapakah yang berhak dalam pengambilan keputusan kegiatan operasional Bank?</label> 
    		</p>  
    		<p><input type="radio" name="question5"  id="correct5">Dewan Komisaris</p>
    		<p><input type="radio" name="question5" >Direksi</p>
		</div>
		
    		<button type="submit"
			class="btn btn-rounded btn-sm btn-success"
			 onclick="result()">
			<i class="mdi mdi-upload"></i> Submit Your Answer
			</button>
  		
  		<script>
        //getting final result
        function result() {
            var score = 0;
            if (document.getElementById('correct1').checked) {
                score++;
            }
            if (document.getElementById('correct2').checked) {
                score++;
            }
            if (document.getElementById('correct3').checked) {
                score++;
            }
            if (document.getElementById('correct4').checked) {
                score++;
            }
            if (document.getElementById('correct5').checked) {
                score++;
            }
            alert("your score is: "+ score);
        }
    </script>

  		
			<!-- main-panel ends -->
		</div>
		<!-- page-body-wrapper ends -->
	</div>
	</div>
	<!-- container-scroller -->

	<jsp:include page="partials/end_body.jsp" />
</body>
</html>