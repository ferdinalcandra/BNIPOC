package com.msi.dmsapp.service;

import java.io.BufferedOutputStream;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.UUID;

import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Service;

import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.pdf.PdfWriter;
import com.itextpdf.tool.xml.XMLWorkerHelper;

@Service
public class GenerateDocumentService {

	public String generateDocument(String documentContent) throws DocumentException, IOException {
		Document document = new Document();
		String path = "C://dms/temp";
		if (!new File(path).exists()) {
			new File(path).mkdirs();
		}
		String name = UUID.randomUUID().toString();
		PdfWriter pdfWriter = PdfWriter.getInstance(document, new FileOutputStream(new File(path + "//" + name + ".pdf")));
		document.open();
		InputStream is = new ByteArrayInputStream(documentContent.getBytes());
		XMLWorkerHelper.getInstance().parseXHtml(pdfWriter, document, is);
		document.close();
		return path + "//" + name + ".pdf";
	}

	public void downloadGeneratedDocument(String path, HttpServletResponse response) {
		response.setContentType("application/pdf");
		String fileName = UUID.randomUUID().toString() + ".pdf";
		response.addHeader("Content-Disposition", "attachment; filename=" + fileName);
		response.setHeader("Content-Transfer-Encoding", "binary");
		try {
			BufferedOutputStream bos = new BufferedOutputStream(response.getOutputStream());
			InputStream inputStream = new FileInputStream(new File(path));
			int len;
			byte[] buf = new byte[2048];
			while ((len = inputStream.read(buf)) > 0) {
				bos.write(buf, 0, len);
			}
			bos.close();
			response.flushBuffer();
			
			if (new File(path).exists()) {
				new File(path).delete();
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

}
