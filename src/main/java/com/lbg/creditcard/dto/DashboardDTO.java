package com.lbg.creditcard.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DashboardDTO {
    private long totalApplications;
    private long approved;
    private long pending;
    private long rejected;
    private List<RecentApplicationDTO> recentApplications;
}
