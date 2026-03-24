package at.htlkaindorf.backend.pojos;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.awt.*;

/**
 * Project: SteirerTech_Webshop
 * Created by: neuala21
 * Date: 17.03.2026
 * Time: 15:17
 **/
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue
    private Long id;

    @Column(nullable = false)
    private String name;        // "Solarpanel"
    private String description; // "100x50 cm"
    @Column(nullable = true)
    private Double price;       // "33,99 €"
    @Column(nullable = false)
    private String status;      // "Auf Lager" <> "Nicht auf Lager"
    private String imageLink;
}
